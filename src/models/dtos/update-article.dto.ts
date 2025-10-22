import { z } from "zod";

export const UpdateArticleDto = z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    content: z.string().optional(),
    image: z.string().optional(),
});
