import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getCurrentUserData } from "@/actions/user.action";
import { GoPersonFill } from "react-icons/go";
import Image from "next/image";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { signOut } from "@/actions/auth.action";
import LogoutButton from "./LogoutButton";
const ProfileSheet = async () => {
  const userInfo = await getCurrentUserData();

  return (
    <Sheet>
      <SheetTrigger>
        <Avatar>
          <AvatarImage src={userInfo.profilePictureUrl} />
          <AvatarFallback className=" bg-primary/80">
            <GoPersonFill className="size-5 " />
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className=" flex flex-col">
        <SheetHeader className=" space-y-5 ">
          <SheetTitle className="text-3xl">Profile</SheetTitle>
        </SheetHeader>
        <div className=" flex flex-col  gap-10 flex-1">
          <div className=" flex flex-col items-center justify-center mt-5 gap-3">
            <Image
              src={userInfo.profilePictureUrl}
              width={120}
              height={120}
              quality={100}
              className="rounded-full"
              alt="profile picture"
            />
            <span className="text-sm">Change Profile Picture</span>
          </div>
          <div className=" space-y-5">
            <div>
              <span className="text-xs text-card-foreground/80">Name</span>
              <h3 className="text-sm font-bold capitalize">{userInfo.name}</h3>
            </div>
            <div>
              <span className="text-xs text-card-foreground/80">Email</span>
              <p className="text-sm text-primary ">{userInfo.email}</p>
            </div>
            <div>
              <span className="text-xs text-card-foreground/80">Id</span>
              <p className="text-sm  ">{userInfo._id}</p>
            </div>

            <div>
              <span className="text-xs text-card-foreground/80">Bio</span>
              {userInfo.bio ? (
                <p>{userInfo.bio}</p>
              ) : (
                <p className="text-sm text-card-foreground/80">Add a bio</p>
              )}
            </div>
            <div>
              <span className="text-xs text-card-foreground/80">Joined On</span>
              <p className="text-sm">
                {dayjs(userInfo.createdAt).format("DD MMM YYYY hh:mm A")}
              </p>
            </div>
          </div>
        </div>
        <SheetFooter>
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSheet;
