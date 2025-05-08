import { z } from "zod";

export const schema = z.object({
  title: z.string().nonempty('Digite uma descrição'),
  type: z.string().nonempty('Selecione um tipo'),
  terminal: z.string().nonempty('Selecione um terminal'),
});

export type FormData = z.infer<typeof schema>;
