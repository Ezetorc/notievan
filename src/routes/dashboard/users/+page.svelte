<script lang="ts">
import { SvelteURLSearchParams } from 'svelte/reactivity'

import type { PageData } from './$types'
import Hero from 'client/components/Hero.svelte'
import LoadingSpinner from 'client/components/LoadingSpinner.svelte'
import { HttpService } from 'client/services/http.service'
import { observe } from 'client/utilities/observe.utility'
import type { PaginatedResult } from 'shared/models/paginated-result.model'
import User from 'users/client/components/User.svelte'
import type { UserOut } from 'users/models/user-out.dto'
import type { UserRole } from 'users/models/user-role.model'
import Page from 'client/components/Page.svelte'

let { data }: { data: PageData } = $props()

let users = $derived<UserOut[]>(data.initialUsers)
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

	const response = await HttpService.get<PaginatedResult<UserOut>>({
		url: `/api/users?${search}`
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
