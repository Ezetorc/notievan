import { isTokenValid } from '../utilities/is-token-valid.utility'
import type { Session } from '../models/session.model'
import type { SanitizedUser } from '../../../backend/api/models/sanitized-user.model.js'

export class SessionService {
	private static name = 'session'

	static get value(): Session | undefined {
		const raw = localStorage.getItem(SessionService.name)

		if (!raw) return undefined

		try {
			const parsed = JSON.parse(raw)

			if (
				typeof parsed !== 'object' ||
				parsed === null ||
				typeof parsed.token !== 'string' ||
				typeof parsed.user !== 'object' ||
				parsed.user === null
			) {
				console.warn('SessionService: datos de sesión corruptos o inválidos')
				return undefined
			}

			return parsed as Session
		} catch (err) {
			console.error('SessionService: error parseando la sesión', err)
			return undefined
		}
	}

	static get token(): string | undefined {
		return SessionService.value?.token
	}

	static get user(): SanitizedUser | undefined {
		return SessionService.value?.user
	}

	static set user(newValue: SanitizedUser) {
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
