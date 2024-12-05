"use client";

import Image from "next/image";
import Link from "next/link";
import { AtSign, EyeIcon, EyeOffIcon, RectangleEllipsis } from "lucide-react";

import { useToggle } from "@projects/hooks/use-toggle";
import { Google } from "@projects/icons/google";
import { Button } from "@projects/ui/button";
import { Checkbox } from "@projects/ui/checkbox";
import { Form } from "@projects/ui/form";
import { TextField, TextFieldInput } from "@projects/ui/input";
import { Label } from "@projects/ui/label";

import useLogin from "~/feature/auth/hooks/useLogin";

const LoginPage = () => {
  const [showPassword, togglePassword] = useToggle(false);

  const { form } = useLogin();

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
          <Form
            validationBehavior="aria"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <form.Field
                  name="email"
                  children={(field) => (
                    <TextField
                      className="space-y-1"
                      id="email"
                      type="email"
                      name={field.name}
                      value={field.state.value}
                      onChange={field.handleChange}
                      isInvalid={field.state.meta.errors.length > 0}
                      isRequired
                    >
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <TextFieldInput className="peer ps-9" required />
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                          <AtSign
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      {field.state.meta.errors.length > 0 && (
                        <ul>
                          {field.state.meta.errors.map((error, i) => (
                            <li
                              key={`${field.name}-message-${i}`}
                              className="text-sm text-red-500"
                            >
                              {error}
                            </li>
                          ))}
                        </ul>
                      )}
                    </TextField>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <form.Field
                  name="password"
                  children={(field) => (
                    <TextField
                      className="space-y-1"
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onChange={field.handleChange}
                      isInvalid={field.state.meta.errors.length > 0}
                      isRequired
                    >
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
                        <TextFieldInput className="peer ps-9" required />
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                          <RectangleEllipsis
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={togglePassword}
                        >
                          {showPassword ? (
                            <EyeIcon className="size-4" aria-hidden="true" />
                          ) : (
                            <EyeOffIcon className="size-4" aria-hidden="true" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                      {field.state.meta.errors.length > 0 && (
                        <ul>
                          {field.state.meta.errors.map((error, i) => (
                            <li
                              key={`${field.name}-message-${i}`}
                              className="text-sm text-red-500"
                            >
                              {error}
                            </li>
                          ))}
                        </ul>
                      )}
                    </TextField>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <form.Field name="rememberMe">
                  {(field) => (
                    <Checkbox
                      id="rememberMe"
                      name={field.name}
                      isSelected={field.state.value}
                      onChange={field.handleChange}
                      isRequired
                    >
                      Remember me
                    </Checkbox>
                  )}
                </form.Field>
              </div>
              <form.Subscribe>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form.Subscribe>
            </div>
          </Form>
          <Button variant="outline" className="w-full space-x-3">
            <Google />
            <span>Login with Google</span>
          </Button>
          <div className="mt-4 space-x-1 text-center text-sm">
            <span>Don&apos;t have an account?</span>
            <Link href="/register" className="underline">
              Register
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
