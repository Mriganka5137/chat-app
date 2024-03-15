import { getCurrentUserData } from "@/actions/user.action";
import ChatArea from "@/components/chat/ChatArea";
import Chats from "@/components/chat/Chats";
import { auth } from "@/lib/auth";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { redirect } from "next/navigation";

export default async function Home() {
  const { session, user } = await auth();
  if (!session) {
    return redirect("/auth/login");
  }

  const userData = await getCurrentUserData();
  return (
    <div className=" max-w-screen-4xl mx-auto   home flex">
      <Chats />
      <ChatArea />
    </div>
  );
}
