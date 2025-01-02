
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCldImageUrl } from "next-cloudinary";
import Signout from "@/components/Signout";
import { auth } from "@/auth";

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

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="w-16 h-16">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm">
          <span>Name:</span>
          <span className="font-medium">{name}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span>Email:</span>
          <span className="font-medium">{email}</span>
        </div>
        <Signout />
      </CardContent>
    </Card>
  );
}
