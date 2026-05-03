import * as z from 'zod'

export const PaginationParamsDto = z.object({
  limit: z.preprocess(
    (val) => (val !== undefined ? Number(val) : undefined),
    z.number().min(1).optional()
  ).default(4),

  page: z.preprocess(
    (val) => (val !== undefined ? Number(val) : undefined),
    z.number().min(1).optional()
  ).default(1)
})
