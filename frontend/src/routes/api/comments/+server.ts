import { COOKIES } from '$lib/configuration/cookies.configuration.js';
import { ServerApiService } from '$lib/services/server-api.service.js';
import type { CommentOut } from 'shared/dtos/out/comment-out.dto.js';

export async function POST({ cookies, request }) {
	const data = await request.json();
	const newComment = await ServerApiService.post<CommentOut>({
		url: '/comments',
		body: data,
		token: cookies.get(COOKIES.AccessToken.name)
	});

	return Response.json(newComment, { status: 201 });
}
