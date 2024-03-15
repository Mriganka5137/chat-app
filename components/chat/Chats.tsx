import React from "react";
import ChatsHeader from "./ChatsHeader";
import ChatsList from "./ChatsList";

const Chats = () => {
  return (
    <div className="w-[400px] bg-secondary/40 h-full p-3 ">
      <ChatsHeader />
      <ChatsList />
    </div>
  );
};

export default Chats;
