import { COOKIES } from '$lib/configuration/cookies.configuration';
import { ServerApiService } from '$lib/services/server-api.service';
import type { UserOut } from 'shared/dtos/out/user-out.dto';

export async function handle({ event, resolve }) {
	const token = event.cookies.get(COOKIES.AccessToken.name);

	event.locals.user = null;

	if (token) {
		try {
			const user = await ServerApiService.get<UserOut>({
				url: '/auth',
				token
			});

			event.locals.user = user;
		} catch {
			event.cookies.delete(COOKIES.AccessToken.name, {
				path: '/'
			});
		}
	}

	return resolve(event);
}
