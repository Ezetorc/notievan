import type { UserOut } from 'shared/dtos/out/user-out.dto';

export async function load({ locals }) {
	return {
		user: locals.user as UserOut | null
	};
}
