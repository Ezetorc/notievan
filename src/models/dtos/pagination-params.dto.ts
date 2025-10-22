import { z } from "zod";

export const PaginationParamsDto = z.object({
    limit: z.preprocess(
        (val) => (val === undefined ? 4 : Number(val)),
        z.number().min(1)
    ),
    page: z.preprocess(
        (val) => (val === undefined ? 1 : Number(val)),
        z.number().min(1)
    ),
});
