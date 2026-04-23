import { useState } from 'react'
import { ZodError, type ZodType } from 'zod'

export function useForm<T extends Record<string, unknown>>(
	onSuccess: (data: T) => Promise<void>,
	schema: ZodType<T>,
	defaultData: T
) {
	const [error, setError] = useState<string>()
	const [data, setData] = useState<T>(defaultData)

	const onSubmit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()

		try {
			const validatedData = schema.parse(data) as T

			setError(undefined)

			await onSuccess(validatedData)
		} catch (error: any) {
			if (error instanceof ZodError) {
				setError(error.issues[0]?.message || 'Error de validación')
			} else {
				setError(error.message || 'Ocurrió un error')
			}
		}
	}

	const watch = (field: keyof T, value: T[keyof T]) => {
		setError(undefined)
		setData((prev) => ({ ...prev, [field]: value }))
	}

	return { error, onSubmit, watch, data }
}
