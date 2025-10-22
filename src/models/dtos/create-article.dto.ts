import { z } from "zod";

export const CreateArticleDto = z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    content: z.string(),
    image: z.union([z.string(), z.any()])
});

