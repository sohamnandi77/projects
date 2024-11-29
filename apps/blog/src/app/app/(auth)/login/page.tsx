"use client";

import Image from "next/image";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { useToggle } from "@projects/hooks/use-toggle";
import { Google } from "@projects/icons/google";
import { Button } from "@projects/ui/button";
import { Input, TextField } from "@projects/ui/input";
import { Label } from "@projects/ui/label";

const LoginPage = () => {
  const [showPassword, togglePassword] = useToggle(false);

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <TextField className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </TextField>
            </div>
            <div className="grid gap-2">
              <TextField className="space-y-1">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePassword}
                  >
                    {showPassword ? (
                      <EyeIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </TextField>
            </div>
            <div className="flex"></div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full space-x-3">
              <Google />
              <span>Login with Google</span>
            </Button>
          </div>
          <div className="mt-4 space-x-1 text-center text-sm">
            <span>Don&apos;t have an account?</span>
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="m-9 hidden lg:block">
        <Image
          src="https://ui.shadcn.com/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full rounded-xl object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default LoginPage;
