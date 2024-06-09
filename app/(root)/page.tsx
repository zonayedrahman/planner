import Dashboard from "@/components/dashboard";
import Temp from "@/components/temp";
import { Button } from "@/components/ui/button";
import { connectToDatabase } from "@/lib/database";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  await connectToDatabase();

  return (
    <div className="h-full flex justify-center items-center">
      <div className=" h-4/5 w-2/5 rounded-lg border border-black border-opacity-20 shadow-lg">
        <SignedOut>
          <div className="flex flex-col justify-center items-center gap-4 pt-[40%]">
            <h1 className="font-bold text-xl text-center">
              Welcome to Planner.
              <br />
              A simple way to plan your days with others.
            </h1>
            <div className="flex gap-2">
              <Link href='/sign-in'>
                <Button variant='link' className="">Sign In</Button>
              </Link>
              <Link href='/sign-up'>
                <Button>Sign Up</Button>
              </Link>
            </div>

          </div>
        </SignedOut>

        <SignedIn>
          <Dashboard />
        </SignedIn>
        {/* <Temp /> */}
      </div>

    </div>
  );
}
