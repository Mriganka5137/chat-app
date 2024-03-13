"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "@/actions/auth.action";
import { IoIosLogOut } from "react-icons/io";
const LogoutButton = () => {
  return (
    <Button
      variant="secondary"
      onClick={() => {
        signOut();
      }}
      className="flex items-center gap-2 w-full"
    >
      <IoIosLogOut className="size-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;
