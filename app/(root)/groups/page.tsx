"use client";
import { useSession } from "@/providers/SessionProvider";
import React from "react";

const GroupPage = () => {
  const { user } = useSession();
  console.log(user);
  return <div>GroupPage</div>;
};

export default GroupPage;
