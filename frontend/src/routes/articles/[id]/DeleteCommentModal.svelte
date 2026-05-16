<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { ClientApiService } from '$lib/services/client-api.service';

	const {
		isOpen,
		close,
		commentId,
		onCommentDeleted
	}: {
		commentId: string;
		close: () => void;
		isOpen: boolean;
		onCommentDeleted: (commentId: string) => void;
	} = $props();
	let error = $state<string | undefined>();

	async function onDelete() {
		try {
			const success = await ClientApiService.delete<boolean>({ url: `/comments/${commentId}` });

			if (success) {
				onCommentDeleted(commentId);
				close();
			} else {
				error = 'Error al eliminar comentario';
			}
		} catch (err) {
			console.error('[DeleteCommentModal]', err);

			error = 'Error al eliminar comentario';
		}
	}
</script>

{#if isOpen}
	<Modal {close} name="¿Querés borrar este comentario?" class="mobile:w-[90vw] tablet:w-[40vw]">
		<ErrorMessage value={error} />

		<div class="space-x-6">
			<Button variant="danger" onclick={onDelete}>Eliminar</Button>
			<Button onclick={close}>Cancelar</Button>
		</div>
	</Modal>
{/if}
