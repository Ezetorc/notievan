import z from "zod";

export const OmitIdParamDto = z.object({
    omit: z.string().uuid()
});