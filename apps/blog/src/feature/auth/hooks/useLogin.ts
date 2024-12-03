import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

import { signIn } from "~/server/auth-client";

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
      await signIn.email(value);
    },
    validatorAdapter: zodValidator(),
  });

  return { form };
};

export default useLogin;
