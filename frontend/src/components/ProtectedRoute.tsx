import { useEffect } from 'react'
import { type Params, Route, type RouteProps, useLocation } from 'wouter'
import type { UserRole } from '../../../shared/src/models/user-role.model'
import { SessionService } from '../services/session.service'

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

	if (!SessionService.value) {
		return null
	}

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
