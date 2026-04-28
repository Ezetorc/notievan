import { useEffect } from 'react'
import { Route, type RouteProps, type Params, useLocation } from 'wouter'
import { SessionService } from '../services/session.service'
import type { UserRole } from '../../../shared/models/user-role.model'

export function ProtectedRoute<P extends Params>({
	component: Component,
	fallback,
	userRole,
	...rest
}: RouteProps<P> & { fallback?: string; userRole?: UserRole }) {
	const [, setLocation] = useLocation()

	useEffect(() => {
		if (!SessionService.value) {
			setLocation(fallback || '/sesion')
		}
	}, [setLocation, fallback])

	if (!SessionService.value) return null

	if (
		userRole &&
		SessionService.user?.role !== userRole &&
		SessionService.user?.role !== 'ADMIN'
	) {
		setLocation(fallback || '/cuenta')
		return null
	}

	return <Route<P> {...rest} component={Component} />
}
