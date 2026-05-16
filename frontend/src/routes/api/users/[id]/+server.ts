import { COOKIES } from '$lib/configuration/cookies.configuration.js';
import { ServerApiService } from '$lib/services/server-api.service';

export async function PATCH({ params, request, cookies }) {
	const token = cookies.get(COOKIES.AccessToken.name);
	const body = await request.json();

	const response = await ServerApiService.patch<boolean>({
		url: `/users/${params.id}`,
		token,
		body
	});

	return Response.json(response);
}
