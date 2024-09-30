import { z } from "zod";

export default function validatePassword(senha: string) {
  const validationSucess = z
    .string({
      errorMap: () => ({
        message: "Senha deve conter 6 dígitos.",
      }),
    })
    .length(6)
    .superRefine((value, ctx) => {
      const vNumber = Number(value);

      if (vNumber < 184759 || vNumber > 856920) {
        ctx.addIssue({
          code: "custom",
          message: "A senha deve estar entre 184759 e 856920.",
        });
      }

      let existAdjacent = false;
      let nextNumberAdd = false;
      for (let index = 0; index < value.length; index++) {
        if (value[index] === value[index - 1]) {
          existAdjacent = true;
        }

        if (Number(value[index]) < Number(value[index - 1])) {
          nextNumberAdd = true;
        }
      }

      if (!existAdjacent) {
        ctx.addIssue({
          code: "custom",
          message:
            "A senha deve conter pelo menos um par de dígitos adjacentes iguais.",
        });
      }

      if (nextNumberAdd) {
        ctx.addIssue({
          code: "custom",
          message: "Os dígitos da senha devem crescer ou se manter.",
        });
      }
    })

    .safeParse(senha);

  if (!validationSucess.success) {
    return validationSucess.error?.errors.map((v) => {
      return v.message;
    });
  }

  return validationSucess.success;
}
