export type PaginatedResult<Type> = {
	data: Type[]
	nextCursor: string | null
}
