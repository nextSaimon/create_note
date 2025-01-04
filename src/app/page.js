import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCldImageUrl } from "next-cloudinary";
import Signout from "@/components/Signout";
import { auth } from "@/auth";
import Loading from "./loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Page() {
  const session = await auth();

  const name = session?.user?.name || "User";
  const email = session?.user?.email || "example@example.com";
  const imageName = session?.user?.image || "default-avatar";
  const avatarUrl = getCldImageUrl({ src: imageName });
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // check if image is downloaded
  if (!avatarUrl) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4 pb-2">
          <Avatar className="w-24 h-24 sm:w-16 sm:h-16">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <span className="font-medium sm:font-normal">Name:</span>
            <span className="font-medium">{name}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <span className="font-medium sm:font-normal">Email:</span>
            <span className="font-medium">{email}</span>
          </div>
          {/* button */}
          <div className=" flex space-x-2 items-center justify-center">
          <Signout />
          <Button className='mt-4 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none'><Link href="/update-password">Update Password</Link></Button>
          <Button className='mt-4 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none'><Link href="/forgot-password">Forgot Password</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

