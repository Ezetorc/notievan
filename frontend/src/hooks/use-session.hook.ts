import { useCallback } from 'react'
import type { SignInDtoType } from "../../../shared/src/dtos/in/sign-in.dto"
import type { SignUpDtoType } from "../../../shared/src/dtos/in/sign-up.dto"
import { AuthService } from '../services/auth.service'
import { SessionService } from '../services/session.service'
import { useSessionStore } from '../stores/session.store'
import { useLocation } from 'wouter'
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from './use-user.hook'

export function useSession() {
	const { user, setUser } = useSessionStore()
	const { user: selfUser, refetch: refetchSelf } = useUser(user?.id)
	const [, setLocation] = useLocation()
	const queryClient = useQueryClient()

	const updateSession = useCallback(async () => {
		if (selfUser) {
			SessionService.user = selfUser
			setUser(selfUser)
			return
		}

		const result = await refetchSelf()
		const fetched = result.data
		if (!fetched) return
		SessionService.user = fetched
		setUser(fetched)
	}, [selfUser, refetchSelf])

	const logout = () => {
		queryClient.invalidateQueries({ queryKey: ['self-user'] })
		queryClient.removeQueries({
			predicate: (query) =>
				Array.isArray(query.queryKey) && query.queryKey[0] === 'articles'
		})

		SessionService.delete()
		setUser(undefined)
		setLocation('/sesion')
	}
	const login = async (data: SignInDtoType) => {
		const result = await AuthService.login(data)

		SessionService.value = result
		setUser(result.user)
		queryClient.invalidateQueries({ queryKey: ['self-user'] })
	}

	const register = async (data: SignUpDtoType) => {
		const result = await AuthService.register(data)

		SessionService.value = result
		setUser(result.user)
		queryClient.invalidateQueries({ queryKey: ['self-user'] })
	}

	return { user, logout, login, register, updateSession }
}
