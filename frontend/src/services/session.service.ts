import type { UserOut } from '../../../shared/src/dtos/out/user-out.dto'
import type { Session } from '../models/session.model'
import { isTokenValid } from '../utilities/is-token-valid.utility'

export class SessionService {
	private static name = 'session'

	static get value(): Session | undefined {
		const raw = localStorage.getItem(SessionService.name)

		if (!raw) {
			return undefined
		}

		try {
			const parsed = JSON.parse(raw)

			if (
				typeof parsed !== 'object' ||
				parsed === null ||
				typeof parsed.token !== 'string' ||
				typeof parsed.user !== 'object' ||
				parsed.user === null
			) {
				console.warn('SessionService: Invalid session data')
				return undefined
			}

			return parsed as Session
		} catch (error) {
			console.error('SessionService: Error parsing session', error)
			return undefined
		}
	}

	static get token(): string | undefined {
		return SessionService.value?.token
	}

	static get user(): UserOut | undefined {
		return SessionService.value?.user
	}

	static set user(newValue: UserOut) {
		if (SessionService.value) {
			SessionService.value = { ...SessionService.value, user: newValue }
		}
	}

	static get isValid(): boolean {
		return SessionService.token ? isTokenValid(SessionService.token) : true
	}

	static set value(newValue: Session) {
		localStorage.setItem(SessionService.name, JSON.stringify(newValue))
	}

	static delete(): void {
		localStorage.removeItem(SessionService.name)
	}
}
