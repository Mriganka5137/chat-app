"use server";

import { auth } from "@/lib/auth";
import { User } from "@/lib/models/user.model";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"];
const maxSize = 1024 * 1024 * 5; // 5MB

export async function getSignedURLAction(
  type: string,
  size: number,
  checksum: string
) {
  const { session, user } = await auth();

  if (!session) {
    return {
      error: "Not authenticated!",
    };
  }

  if (size > maxSize) {
    return { error: "File is too large!" };
  }

  if (!acceptedTypes.includes(type)) {
    return { error: "Invalid file type!" };
  }
  const fileName = generateFileName();
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  const updatedProfilePicUrl = signedUrl.split("?")[0];
  await User.findByIdAndUpdate(user?.id, {
    profilePictureUrl: updatedProfilePicUrl,
  });

  return {
    success: { url: signedUrl },
  };
}
