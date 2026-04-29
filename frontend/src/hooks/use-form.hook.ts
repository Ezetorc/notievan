import { useState, type FormEventHandler } from 'react'
import { ZodError, type ZodType } from 'zod'
import { parseZodError } from '../utilities/parse-zod-error.utility'
import { parseBackendError } from '../utilities/parse-backend-error.utility'

export function useForm<T extends Record<string, unknown>>(
	onSuccess: (data: T) => Promise<void>,
	schema: ZodType<T>,
	defaultData: T
) {
	const [error, setError] = useState<string>()
	const [data, setData] = useState<T>(defaultData)

	const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()

		try {
			const validatedData = schema.parse(data) as T

			setError(undefined)

			await onSuccess(validatedData)
		} catch (error: any) {
			if (error instanceof ZodError) {
				let parsedError = parseZodError(error.issues[0])

				setError(parsedError)
			} else {
				let parsedError = parseBackendError(error)

				setError(parsedError)
			}
		}
	}

	const watch = (field: keyof T, value: T[keyof T]) => {
		setError(undefined)
		setData((prev) => ({ ...prev, [field]: value }))
	}

	return { error, onSubmit, watch, data }
}
