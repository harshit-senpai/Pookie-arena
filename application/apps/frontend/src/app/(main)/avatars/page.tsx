"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

export default function AvatarsPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!user) {
    redirect("/");
  }

  return (
    <main className="h-full w-full flex flex-col justify-center relative">
      <h1 className="text-3xl font-bold mb-8 text-center">Avatars</h1>
      <div className="grid md:grid-cols-3 gap-4 grid-cols-2 w-full place-items-center max-w-4xl mx-auto">
        <Avatar className="h-32 w-32 border-8 border-[#DF65EF] shadow-xl">
          <AvatarImage src="user.svg" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <Avatar className="h-32 w-32 border-8 border-[#DF65EF] shadow-xl">
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <Avatar className="h-32 w-32 border-8 border-[#DF65EF] shadow-xl">
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </div>
      <div className="grid md:grid-cols-4 gap-4 grid-cols-2 w-full place-items-center mt-6">
        <Avatar className="h-32 w-32 border-8 border-[#DF65EF] shadow-xl">
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <Avatar className="h-32 w-32 border-8 border-[#DF65EF] shadow-xl">
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <Avatar className="h-32 w-32 border-8 border-[#DF65EF] shadow-xl">
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <Avatar className="h-32 w-32 border-8 border-[#DF65EF] shadow-xl">
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-2xl font-bold mt-10 text-center">
        Select your favourite avatar
      </div>
      <div className="mx-auto flex gap-6">
        <Button className="rounded-full mt-4 px-10 bg-gradient-to-r from-[#A69AF9] to-[#EF56EC] text-white hover:opacity-90 font-semibold">
          skip
        </Button>
        <Button className="mx-auto rounded-full mt-4 px-10 bg-gradient-to-r from-[#A69AF9] to-[#EF56EC] text-white hover:opacity-90 font-semibold">
          Next
        </Button>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
    </main>
  );
}
