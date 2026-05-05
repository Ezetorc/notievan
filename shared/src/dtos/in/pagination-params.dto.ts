import * as z from 'zod'

export const PaginationParamsDto = z.object({
  limit: z.preprocess(
    (val) => (val !== undefined ? Number(val) : undefined),
    z.number().min(1).max(50).optional()
  ).default(4),

  cursor: z.string().optional()
})
