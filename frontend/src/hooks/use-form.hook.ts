import { type FormEventHandler, useState } from 'react'
import { ZodError, type ZodType } from 'zod'
import { parseBackendError } from '../utilities/parse-backend-error.utility'
import { parseZodError } from '../utilities/parse-zod-error.utility'

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
			const currentData = { ...data }

			schema.parse(currentData)

			setError(undefined)

			await onSuccess(currentData)
		} catch (error: any) {
			console.error('[useForm] ', error)

			if (error instanceof ZodError) {
				const parsedError = parseZodError(error.issues[0])
				setError(parsedError)
			} else {
				const parsedError = parseBackendError(error)
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
