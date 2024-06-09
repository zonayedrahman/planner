import Temp from "@/components/temp";
import { connectToDatabase } from "@/lib/database";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default async function Home() {

  await connectToDatabase();

  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Temp />
    </div>
  );
}
