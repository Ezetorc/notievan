import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy, Suspense, useEffect } from 'react'
import { Route, Switch } from 'wouter'
import { Header } from './components/Header'
import { Loading } from './components/Loading'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useSession } from './hooks/use-session.hook'
import { SessionService } from './services/session.service'

const LazyHomePage = lazy(() => import('./pages/Home/components/HomePage'))
const LazySignUpPage = lazy(
	() => import('./pages/SignUp/components/SignUpPage')
)
const LazySignInPage = lazy(
	() => import('./pages/SignIn/components/SignInPage')
)
const LazyAccountPage = lazy(
	() => import('./pages/Account/components/AccountPage')
)
const LazyArticlePage = lazy(
	() => import('./pages/Article/components/ArticlePage')
)
const LazyCreateArticlePage = lazy(
	() => import('./pages/CreateArticle/components/CreateArticlePage')
)
const LazyEditArticlePage = lazy(
	() => import('./pages/EditArticle/components/EditArticlePage')
)
const LazyDashboardPage = lazy(
	() => import('./pages/Dashboard/components/DashboardPage')
)
const LazyNotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
	const { updateSession } = useSession()

	useEffect(() => {
		if (SessionService.isValid) {
			updateSession()
		} else {
			SessionService.delete()
		}
	}, [updateSession])

	return (
		<Suspense fallback={<Loading />}>
			<Header />
			<main className='flex mobile:px-4 desktop:px-0 mt-24 flex-col max-w-7xl mx-auto'>
				<Switch>
					<Route path='/' component={LazyHomePage} />
					<Route path='/registro' component={LazySignUpPage} />
					<Route path='/sesion' component={LazySignInPage} />
					<ProtectedRoute
						fallback='/'
						userRole='AUTHOR'
						path='/articulos/nuevo'
						component={LazyCreateArticlePage}
					/>
					<Route path='/articulos/:id'>
						{(params) => <LazyArticlePage id={params.id} />}
					</Route>
					<ProtectedRoute
						fallback='/'
						userRole='AUTHOR'
						path='/articulos/editar/:id'
					>
						{(params: { id: string }) => <LazyEditArticlePage id={params.id} />}
					</ProtectedRoute>
					<ProtectedRoute
						fallback='/'
						path='/cuenta'
						component={LazyAccountPage}
					/>
					<ProtectedRoute
						fallback='/'
						userRole='ADMIN'
						path='/admin'
						component={LazyDashboardPage}
					/>
					<Route component={LazyNotFoundPage}></Route>
				</Switch>
				<ReactQueryDevtools />
			</main>
		</Suspense>
	)
}
