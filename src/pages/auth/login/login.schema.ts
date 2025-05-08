import { z } from "zod";

export const schema = z.object({
  email: z
    .string()
    .nonempty("Digite seu e-mail")
    .email("Digite um e-mail válido")
    .refine((val) => val.includes("@gbm"), { message: "E-mail deve conter '@gbm'" }),
  password: z.string().nonempty("Digite a sua senha"),
});

export type FormData = z.infer<typeof schema>;
