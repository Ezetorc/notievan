type Path = `/${string}`
type RouteValue = Path | ((...args: any[]) => Path)

export const ROUTES = {
	Home: '/',
	Account: '/account',
	Articles: '/articles',
	Article: (id: string) => `/articles/${id}`,
	CreateArticle: '/articles/new',
	EditArticle: (id: string) => `/articles/${id}/edit`,
	Users: '/dashboard/users',
	SignIn: '/sign-in',
	SignUp: '/sign-up'
} satisfies Record<string, RouteValue>
