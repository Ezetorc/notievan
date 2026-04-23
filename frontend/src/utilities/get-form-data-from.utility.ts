export function getFormDataFrom(obj: Record<string, any>): FormData {
	const formData = new FormData()

	for (const [key, value] of Object.entries(obj)) {
		if (value instanceof File) {
			formData.append(key, value)
		} else if (typeof value === 'object' && value !== null) {
			formData.append(key, JSON.stringify(value))
		} else {
			formData.append(key, String(value))
		}
	}

	return formData
}
