import { number, object, string, preprocess } from 'zod'

export const PaginationParamsDto = object({
  limit: preprocess(
    (val) => (val !== undefined ? Number(val) : undefined),
    number().min(1).max(50).optional()
  ).default(4),

  cursor: string().optional()
})
