"use server";

import { auth } from "@/lib/auth";
import { User } from "@/lib/models/user.model";

import { revalidatePath } from "next/cache";

export const getCurrentUserData = async () => {
  try {
    const { session, user } = await auth();
    if (!session) {
      return null;
    }

    const userData = await User.findById(user?.id);
    return userData;
  } catch (error: any) {
    return { error: error.message };
  }
};
