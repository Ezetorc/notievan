import type { Actions } from './$types';
import { SignUpDto } from 'shared/dtos/in/sign-up.dto';
import { ServerApiService } from '$lib/services/server-api.service';
import { COOKIES } from '$lib/configuration/cookies.configuration';
import type { UserOut } from 'shared/dtos/out/user-out.dto';
import { parseFormError } from '$lib/utilities/parse-form-error.utility';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		try {
			const result = SignUpDto.parse(Object.fromEntries(data));

			const response = await ServerApiService.post<{ user: UserOut; token: string }>({
				url: `/auth/sign-up`,
				body: result
			});

			cookies.set(COOKIES.AccessToken.name, response.token, COOKIES.AccessToken.options);

			return true;
		} catch (error) {
			console.error('[SignUp] ', error);

			return parseFormError(error);
		}
	}
};
