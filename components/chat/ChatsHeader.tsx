import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RiChatNewLine } from "react-icons/ri";

const ChatsHeader = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-gray-400 ">My Chats</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-sm py-1  px-2 border flex items-center gap-1  ">
            <span className="">New</span>
            <RiChatNewLine className="size-5 " />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              New Chat
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              New Group
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatsHeader;
