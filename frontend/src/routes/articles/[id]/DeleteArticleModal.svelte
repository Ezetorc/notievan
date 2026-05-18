<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { ROUTES } from '$lib/configuration/routes.configuration';
	import { ClientApiService } from '$lib/services/client-api.service';

	const {
		isOpen,
		close,
		articleId
	}: {
		articleId: string;
		close: () => void;
		isOpen: boolean;
	} = $props();
	let error = $state<string | undefined>();

	async function onDelete() {
		try {
			const success = await ClientApiService.delete<boolean>({ url: `/articles/${articleId}` });

			if (success) {
				goto(ROUTES.Home);
				close();
			} else {
				error = 'Error al eliminar artículo';
			}
		} catch (err) {
			console.error('[DeleteArticleModal]', err);

			error = 'Error al eliminar artículo';
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
