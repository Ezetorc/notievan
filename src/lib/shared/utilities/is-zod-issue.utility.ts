import type { $ZodIssue } from 'zod/v4/core'

export function isZodIssue(value: any): value is $ZodIssue {
	return typeof value === 'object' && value !== null && 'message' in value
}
