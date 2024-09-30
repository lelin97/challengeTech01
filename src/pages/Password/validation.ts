import { z } from "zod";

export const validationPassword = z.object({
  name: z
    .string({
      errorMap: () => ({
        message: "Nome é um campo obrigatório.",
      }),
    })
    .min(1),
  email: z
    .string({
      errorMap: () => ({
        message: "E-mail é um campo obrigatório.",
      }),
    })
    .email()
    .min(1),
  password: z.string(),
});

export type DefaultPasswordInput = z.input<typeof validationPassword>;
export type DefaultPasswordOutput = z.output<typeof validationPassword>;
