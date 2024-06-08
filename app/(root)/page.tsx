import { connectToDatabase } from "@/lib/database";
import Image from "next/image";

export default async function Home() {

  await connectToDatabase();

  return (
    <div>
      <h1>Home</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </div>
  );
}
