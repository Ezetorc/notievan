<script lang="ts">
import type { ModalProps } from 'svelte-modals'
import { modals } from 'svelte-modals'
import { goto } from '$app/navigation'
import type { PageData } from './$types'
import AccountArticles from 'articles/client/components/AccountArticles.svelte'
import Button from 'client/components/Button.svelte'
import Field from 'client/components/Field.svelte'
import FieldsGroup from 'client/components/FieldsGroup.svelte'
import Hero from 'client/components/Hero.svelte'
import { HttpService } from 'client/services/http.service'
import { ROUTES } from 'shared/configuration/routes.configuration'
import { userStore } from 'users/client/stores/user.store'
import type { UserOut } from 'users/models/user-out.dto'
import Page from 'client/components/Page.svelte'
import ChangeNameModal from 'users/client/components/ChangeNameModal.svelte'

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

	await HttpService.post<void>({
		url: '/api/auth/logout'
	})

	goto(ROUTES.SignIn)
}
</script>

<Page>
    <Hero title="Cuenta" description="Mirá y cambiá tus datos" />

    <article class="flex flex-col gap-y-16">
        <FieldsGroup name="Información">
            <Field name="Nombre de usuario" value={user.name} />
            <Field
                name="Fecha de creación"
                value={makeDateDisplayable(user.createdAt)}
            />
        </FieldsGroup>

        <FieldsGroup name="Acciones">
            <Button onclick={logout}>Cerrar sesión</Button>
            <Button
                onclick={() => {
                    modals.open<ModalProps<any> & { user: UserOut }>(
                        ChangeNameModal,
                        { user },
                    );
                }}>Cambiar nombre</Button
            >
        </FieldsGroup>

        {#if data.initialArticles.length > 0}
            <AccountArticles {...data} />
        {/if}
    </article>
</Page>
