"use client";

import SignInForm from "@/components/forms/SignInForm";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

export default function SigninPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (user) {
    redirect("/");
  }

  return (
    <section className="flex items-center justify-center px-2 lg:px-4 h-full">
      <SignInForm />
    </section>
  );
}
