<script lang="ts">
import type { UserOut } from 'shared/dtos/out/user-out.dto'
import type { PaginatedResult } from 'shared/models/paginated-result.model'
import type { UserRole } from 'shared/models/user-role.model'
import { SvelteURLSearchParams } from 'svelte/reactivity'
import Hero from '$lib/components/Hero.svelte'
import LoadingSpinner from '$lib/components/LoadingSpinner.svelte'
import Page from '$lib/components/Page.svelte'
import { ClientApiService } from '$lib/services/client-api.service'
import { observe } from '$lib/utilities/observe.utility'
import type { PageData } from './$types'
import User from './User.svelte'

let { data }: { data: PageData } = $props()

let users = $derived(data.initialUsers)
let cursor = $derived<string | null>(data.initialCursor)
let loading = $state(false)
let hasMore = $derived(Boolean(cursor))

async function loadMore() {
	if (!hasMore || loading) return

	loading = true

	const search = new SvelteURLSearchParams()

	if (cursor) {
		search.set('cursor', cursor)
	}

	search.set('limit', '5')

	const response = await ClientApiService.get<PaginatedResult<UserOut>>({
		url: `/users?${search}`
	})

	users = [...users, ...response.data]
	cursor = response.nextCursor
	hasMore = Boolean(cursor)
	loading = false
}

function onRoleChange(userId: string, newRole: UserRole) {
	users = users.map((user) =>
		user.id === userId ? { ...user, role: newRole } : user
	)
}
</script>

<Page>
	<Hero title="Usuarios" description="Administrá usuarios" />

	<div class="overflow-x-auto">
		<table class="min-w-full border-collapse">
			<thead>
				<tr class="bg-gray-100">
					<th class="border bg-brand-orange p-3 text-left">Nombre</th>
					<th class="border bg-brand-orange p-3 text-left">Rol</th>
				</tr>
			</thead>
			<tbody>
				{#each users as user (user.id)}
					<User {user} {onRoleChange} />
				{/each}
			</tbody>
		</table>
	</div>

	{#if hasMore}
		<div class="flex w-full justify-center">
			<LoadingSpinner attach={(element) => observe(element, loadMore)} />
		</div>
	{/if}
</Page>
