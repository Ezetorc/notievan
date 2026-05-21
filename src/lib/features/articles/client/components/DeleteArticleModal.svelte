<script lang="ts">
import { goto } from '$app/navigation'
import Button from 'client/components/Button.svelte'
import ErrorMessage from 'client/components/ErrorMessage.svelte'
import Modal from 'client/components/Modal.svelte'
import { HttpService } from 'client/services/http.service'
import { ROUTES } from 'shared/configuration/routes.configuration'

const {
	isOpen,
	close,
	articleId
}: {
	articleId: string
	close: () => void
	isOpen: boolean
} = $props()
let error = $state<string | undefined>()

async function onDelete() {
	try {
		const success = await HttpService.delete<boolean>({
			url: `/api/articles/${articleId}`
		})

		if (success) {
			goto(ROUTES.Home)
			close()
		} else {
			error = 'Error al eliminar artículo'
		}
	} catch (err) {
		console.error('[DeleteArticleModal]', err)

		error = 'Error al eliminar artículo'
	}
}
</script>

{#if isOpen}
	<Modal {close} name="¿Querés borrar este artículo?" class="mobile:w-[90vw] tablet:w-[40vw]">
		<ErrorMessage value={error} />

		<div class="space-x-6">
			<Button variant="danger" onclick={onDelete}>Eliminar</Button>
			<Button onclick={close}>Cancelar</Button>
		</div>
	</Modal>
{/if}
