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
  return <div className=" max-w-5xl mx-auto p-5 "></div>;
};

export default ManageAccount;
