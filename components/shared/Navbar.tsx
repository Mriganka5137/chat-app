import { auth } from "@/lib/auth";
import { BsChatSquareQuote } from "react-icons/bs";
import Link from "next/link";
import ProfileSheet from "../auth/ProfileSheet";

const Navbar = async () => {
  const { session, user } = await auth();
  return (
    // <div className=" w-full h-20  p-5 bg-primary/10">
    <div className=" w-full  flex justify-between items-center  p-2 bg-primary/10 sm:p-2 md:p-2.5 lg:p-3.5 xl:p-5 ">
      <Link href="/" className="flex items-center gap-2">
        <BsChatSquareQuote className="size-4 hover:text-primary cursor-pointer transition-colors duration-500 ease-in-out sm:size-7 md:size-8 lg:size-9 xl:size-10" />
        <span className="text-2xl flex gap-0 ">
          Whats <span className="text-primary font-bold ">Up</span>
        </span>
      </Link>
      <div className="flex gap-2 items-center md:gap-3 lg:gap-4">
        {user && (
          <p className="text-white text-[8px] sm:text-xs  md:text-base ">
            {user?.name.split(" ")[0]}
          </p>
        )}
        {session && <ProfileSheet />}
      </div>
    </div>
    // </div>
  );
};

export default Navbar;
