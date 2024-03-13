import { getCurrentUserData } from "@/actions/user.action";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const ManageAccount = async () => {
  const { session, user } = await auth();
  if (!session) {
    return redirect("/auth/login");
  }

  const userInfo = await getCurrentUserData();
  return (
    <div className=" max-w-5xl mx-auto p-5 ">
      <h1 className=" text-5xl">Account</h1>
      <h3 className=" mt-2 text-base text-secondary-foreground/60">
        Manage your account information
      </h3>
    </div>
  );
};

export default ManageAccount;
