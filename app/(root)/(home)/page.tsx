import { getCurrentUserData } from "@/actions/user.action";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { session, user } = await auth();
  if (!session) {
    return redirect("/auth/login");
  }

  const userData = await getCurrentUserData();
  return (
    <div className=" max-w-screen-4xl mx-auto p-5 space-y-5 border home">
      Home
    </div>
  );
}
