"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "@/schema";
import { apiClient } from "@/utils/apiClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    try {
      setIsLoading(true);
      const response = await apiClient.signUp({ data: values });

      if (response.status === 200) {
        toast({
          description: "Signed Up Successfully!",
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
      <CardContent className="flex flex-row-reverse p-0">
        <div className="w-1/2 rounded-none hidden md:block">
          <Image
            src={"/assets/login-image.png"}
            alt="login image"
            width={500}
            height={500}
            className="lg:rounded-r-[44px] md:rounded-r-[32px] h-full"
          />
        </div>
        <div className="px-6 py-12 lg:py-0 w-full md:w-1/2 lg:flex flex-col justify-center">
          <div className="flex flex-col items-center gap-2 mb-8">
            <h2 className="md:text-3xl text-2xl font-semibold text-gray-900 text-center">
              Create an account!
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
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="shadow_monarch"
                            disabled={isSubmitting || isLoading}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
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
              already have an account?{" "}
              <Link href={"/sign-in"} className="underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
