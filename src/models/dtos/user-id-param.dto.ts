import z from "zod";

export const UserIdParamDto = z.object({
  id: z.string().cuid(),
});
