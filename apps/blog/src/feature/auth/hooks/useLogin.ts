import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { client } from "~/server/auth-client";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean(),
});

const useLogin = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      await client.signIn.email({ ...value, callbackURL: "/" });
    },
  });

  return { form };
};

export default useLogin;
