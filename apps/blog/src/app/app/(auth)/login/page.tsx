"use client";

import Image from "next/image";

import { Google } from "@projects/icons/google";
import { Button } from "@projects/ui/button";

const LoginPage = () => {
  return (
    <div className="flex p-9">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <div>Sign in to your Account</div>
        <Button>
          <Google />
          Continue with Google
        </Button>
        <div>djalkd</div>
      </div>
      <div className="h-full w-1/2">
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
