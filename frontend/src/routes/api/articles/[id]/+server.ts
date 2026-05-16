import { COOKIES } from '$lib/configuration/cookies.configuration';
import { ServerApiService } from '$lib/services/server-api.service';

export async function DELETE({ cookies, params }) {
	const { id } = params;
	const success = await ServerApiService.delete<boolean>({
		url: `/articles/${id}`,
		token: cookies.get(COOKIES.AccessToken.name)
	});

	return Response.json(success);
}
