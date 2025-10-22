import { z } from "zod";

export const CreateArticleDto = z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    content: z.string(),
    thumbnailFile: z.instanceof(File),
    thumbnailAlt: z.string(),
});
