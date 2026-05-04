type Env = {
	baseUrl: string
}

export const env: Env = {
	baseUrl: import.meta.env.VITE_PUBLIC_API_URL || 'http://localhost:3000'
}
