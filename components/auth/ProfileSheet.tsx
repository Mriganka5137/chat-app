import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { getCurrentUserData } from "@/actions/user.action";
import { GoPersonFill } from "react-icons/go";
import Image from "next/image";
import dayjs from "dayjs";

import LogoutButton from "./LogoutButton";

import ProfilePicUploader from "../shared/ProfilePicUploader";
const ProfileSheet = async () => {
  const userInfo = await getCurrentUserData();

  return (
    <Sheet>
      <SheetTrigger>
        {userInfo.profilePictureUrl ? (
          <Image
            alt="Profile Picture"
            width={1000}
            height={1000}
            src={userInfo.profilePictureUrl}
            className="size-12 rounded-full object-cover
            "
          />
        ) : (
          <GoPersonFill className="size-16" />
        )}
      </SheetTrigger>
      <SheetContent className=" flex flex-col">
        <SheetHeader className=" space-y-5 ">
          <SheetTitle className="text-3xl">Profile</SheetTitle>
        </SheetHeader>
        <div className=" flex flex-col  gap-10 flex-1">
          <ProfilePicUploader profilePictureUrl={userInfo.profilePictureUrl} />
          <div className=" space-y-5">
            <div>
              <span className="text-xs text-card-foreground/80">Name</span>
              <h3 className="text-sm font-bold capitalize">{userInfo.name}</h3>
            </div>
            <div>
              <span className="text-xs text-card-foreground/80">Email</span>
              <p className="text-sm text-primary ">{userInfo.email}</p>
            </div>
            <div>
              <span className="text-xs text-card-foreground/80">Id</span>
              <p className="text-sm  ">{userInfo._id}</p>
            </div>

            <div>
              <span className="text-xs text-card-foreground/80">Bio</span>
              {userInfo.bio ? (
                <p>{userInfo.bio}</p>
              ) : (
                <p className="text-sm text-card-foreground/80">Add a bio</p>
              )}
            </div>
            <div>
              <span className="text-xs text-card-foreground/80">Joined On</span>
              <p className="text-sm">
                {dayjs(userInfo.createdAt).format("DD MMM YYYY hh:mm A")}
              </p>
            </div>
          </div>
        </div>
        <SheetFooter>
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSheet;
