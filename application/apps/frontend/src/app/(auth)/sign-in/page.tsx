import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function SigninPage() {
  return (
    <Card className="xl:w-[1000px] shadow-lg rounded-[44px]">
      <CardContent className="flex p-0">
        <div className="w-1/2 rounded-none hidden md:block">
          <Image
            src={"/assets/login-image.png"}
            alt="login image"
            width={500}
            height={500}
            className="rounded-l-[44px] h-full"
          />
        </div>
        <div className="px-6 py-12 xl:py-32 w-full md:w-1/2">
          <div className="flex flex-col items-center gap-2 mb-8">
            <h2 className="md:text-3xl text-2xl font-semibold text-gray-900">
              Welcome back!
            </h2>
            <p className="md:text-lg text-sm text-muted-foreground font-normal">
              Please enter your details
            </p>
          </div>
          <div className="flex flex-col px-8">
            <div>
              <Label>Email</Label>
              <Input type="email" className="mt-2 max-w-sm" />
            </div>
            <div className="mt-4">
              <Label>Password</Label>
              <Input type="password" className="mt-2 max-w-sm" />
            </div>
          </div>
          <div className="mx-auto w-full px-8 mt-8">
            <Button className="w-full rounded-full">Login</Button>
          </div>
          <div className="mx-auto w-full px-8 mt-4">
            <Button variant={"secondary"} className="w-full rounded-full">
              Login With Google
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
