"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignInSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@/utils/apiClient";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    try {
      setIsLoading(true);
      const response = await apiClient.signIn(values);

      if (response.status === 200) {
        toast({
          description: "Signed In Successfully!",
        });
        form.reset();
        router.push("");
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was an error while Signing Up.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error,
      });
    }
  };

  return (
    <Card className="md:w-[1000px] w-[450px] shadow-lg md:rounded-[32px] lg:rounded-[44px]">
      <CardContent className="flex p-0">
        <div className="w-1/2 rounded-none hidden md:block">
          <Image
            src={"/assets/login-image.png"}
            alt="login image"
            width={500}
            height={500}
            className="lg:rounded-l-[44px] md:rounded-l-[32px] h-full"
          />
        </div>
        <div className="px-6 py-12 lg:py-0 w-full md:w-1/2 lg:flex flex-col justify-center">
          <div className="flex flex-col items-center gap-2 mb-8">
            <h2 className="md:text-3xl text-2xl font-semibold text-gray-900 text-center">
              welcome Back!
            </h2>
            <p className="md:text-lg text-sm text-muted-foreground font-normal">
              Please enter your details
            </p>
          </div>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                className="space-y-6 lg:px-10 px-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="space-y-4">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="example@gmail.com"
                            disabled={isSubmitting || isLoading}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="*******"
                            disabled={isSubmitting || isLoading}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full flex"
                  disabled={isSubmitting || !isValid || isLoading}
                >
                  Sign Up
                  {isLoading && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  )}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link href={"/sign-up"} className="underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
