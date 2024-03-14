"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { GoPersonFill } from "react-icons/go";
import Image from "next/image";
import { BsXLg } from "react-icons/bs";
import { getSignedURLAction } from "@/actions/aws.action";
import { useToast } from "../ui/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";

interface ProfilePicUploaderProps {
  profilePictureUrl: string;
}

const ProfilePicUploader = ({ profilePictureUrl }: ProfilePicUploaderProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [profilePicUrl, setProfilePicUrl] = useState<string | undefined>(
    profilePictureUrl
  );

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const compressImage = async (file: File) => {
    try {
      const options = {
        maxSizeMB: 0.2, // Adjust the maximum file size (in MB) as needed
        maxWidthOrHeight: 1920, // Adjust the maximum width or height as needed
        useWebWorker: true, // Enable Web Worker for better performance
      };

      const compressedFile = await imageCompression(file, options);

      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setPending(true);
    e.preventDefault();
    try {
      if (file) {
        const result = await getSignedURLAction(
          file.type,
          file.size,
          await computeSHA256(file)
        );
        if (result?.error) {
          throw new Error(result.error);
        }

        const url = result.success?.url;
        if (url) {
          await fetch(url, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file?.type,
            },
          });
          setFile(undefined);
          toast({
            variant: "success",
            title: "Profile Picture Updated!",
          });
          router.refresh();
        }
      }
    } catch (error: any) {
      setPending(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setPending(false);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      return;
    }
    const compressedImage = await compressImage(selectedFile!);
    setFile(compressedImage);

    if (profilePicUrl) {
      URL.revokeObjectURL(profilePicUrl);
    }

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setProfilePicUrl(url);
    } else {
      setProfilePicUrl(profilePictureUrl);
    }
  };

  return (
    <>
      <div className=" flex flex-col items-center justify-center mt-5 gap-3">
        {profilePictureUrl ? (
          <Dialog>
            <DialogTrigger disabled={pending}>
              <Image
                src={profilePicUrl!}
                width={1200}
                height={1200}
                quality={100}
                className="rounded-full size-32 object-cover"
                alt="profile picture"
              />
            </DialogTrigger>
            <DialogContent className="p-0 overflow-hidden">
              <Image
                src={profilePicUrl!}
                width={2000}
                height={2000}
                quality={100}
                className="object-contain w-full h-full"
                alt="profile picture "
              />
            </DialogContent>
          </Dialog>
        ) : (
          <GoPersonFill className="size-[120px] bg-primary/80 rounded-full p-5 " />
        )}
        <form onSubmit={handleSubmit}>
          <Input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            placeholder="Change Profile Picture"
            className="hidden"
            id="profile-pic"
            max={1}
            onChange={handleChange}
          />
          <div className="flex flex-col items-center gap-3">
            {file && (
              <div className="flex items-center gap-3">
                <span className="text-[10px] line-clamp-1">{file.name}</span>
                <Button
                  disabled={pending}
                  size="sm"
                  variant="ghost"
                  className="p-0 h-0"
                  onClick={() => {
                    setFile(undefined);
                    setProfilePicUrl(profilePictureUrl);
                  }}
                >
                  <BsXLg className="cursor-pointer" />
                </Button>
              </div>
            )}

            {!file ? (
              <Label
                htmlFor="profile-pic"
                className="cursor-pointer hover:text-slate-400 hover:underline text-primary text-xs"
              >
                Change Profile Picture
              </Label>
            ) : (
              <Button
                size="sm"
                type="submit"
                className="w-fit"
                disabled={pending}
              >
                {pending ? "Uploading..." : "Upload"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfilePicUploader;
