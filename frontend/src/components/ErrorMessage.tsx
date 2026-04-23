export function ErrorMessage({ value }: { value?: string }) {
	if (!value) return null

	return <p className='text-red-500'>{value}</p>
}
