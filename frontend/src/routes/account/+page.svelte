<script lang="ts">
import { UserOut } from 'shared/dtos/out/user-out.dto'
import type { ModalProps } from 'svelte-modals'
import { modals } from 'svelte-modals'
import { goto } from '$app/navigation'
import Button from '$lib/components/Button.svelte'
import Field from '$lib/components/Field.svelte'
import FieldsGroup from '$lib/components/FieldsGroup.svelte'
import Hero from '$lib/components/Hero.svelte'
import Page from '$lib/components/Page.svelte'
import { ROUTES } from '$lib/configuration/routes.configuration'
import { ClientApiService } from '$lib/services/client-api.service'
import { userStore } from '$lib/stores/user.store'
import type { PageData } from './$types'
import AccountArticles from './AccountArticles.svelte'
import ChangeNameModal from './ChangeNameModal.svelte'

let { data }: { data: PageData } = $props()

$effect(() => {
	userStore.set(data.user)
})

const user = $derived($userStore ?? data.user)

function makeDateDisplayable(date: string): string {
	return new Date(date).toLocaleDateString('es-AR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}

async function logout() {
	userStore.set(null)

	await ClientApiService.post<void>({
		url: '/auth/logout'
	})

	goto(ROUTES.SignIn)
}
</script>

<Page>
	<Hero title="Cuenta" description="Mirá y cambiá tus datos" />

	<article class="flex flex-col gap-y-16">
		<FieldsGroup name="Información">
			<Field name="Nombre de usuario" value={user.name} />
			<Field name="Fecha de creación" value={makeDateDisplayable(user.createdAt)} />
		</FieldsGroup>

		<FieldsGroup name="Acciones">
			<Button onclick={logout}>Cerrar sesión</Button>
			<Button
				onclick={() => {
					modals.open<ModalProps<any> & { user: UserOut }>(ChangeNameModal, { user });
				}}>Cambiar nombre</Button
			>
		</FieldsGroup>

		{#if data.initialArticles.length > 0}
			<AccountArticles {data} />
		{/if}
	</article>
</Page>
