import { auth } from "@/lib/auth";
import { BsChatSquareQuote } from "react-icons/bs";
import Link from "next/link";
import ProfileSheet from "../auth/ProfileSheet";

const Navbar = async () => {
  const { session, user } = await auth();
  return (
    <div className=" w-full h-20 border-b border-primary/20  p-5 bg-primary/10">
      <div className=" w-full  flex justify-between items-center  px-0">
        <Link href="/">
          <BsChatSquareQuote className="size-8 hover:text-primary cursor-pointer transition-colors duration-500 ease-in-out" />
        </Link>
        <div className="flex gap-5 items-center">
          {user && <p className="text-white text-sm ">{user?.name}</p>}
          {session && <ProfileSheet />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
