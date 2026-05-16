<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { $ZodIssue } from 'zod/v4/core';
	import { ZodError } from 'zod';
	import Textarea from '$lib/components/Textarea.svelte';
	import { CreateCommentDto } from 'shared/dtos/in/create-comment.dto';
	import { CommentOut } from 'shared/dtos/out/comment-out.dto';
	import { ClientApiService } from '$lib/services/client-api.service';

	const {
		isOpen,
		close,
		articleId,
		onCommentCreated
	}: {
		articleId: string;
		close: () => void;
		isOpen: boolean;
		onCommentCreated: (comment: CommentOut) => void;
	} = $props();
	let error = $state<string | $ZodIssue | undefined>();

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const content = formData.get('content') as string;

		try {
			const result = CreateCommentDto.parse({ content, articleId });
			const newComment = await ClientApiService.post<CommentOut>({
				url: '/comments',
				body: result
			});

			if (newComment) {
				onCommentCreated(newComment);
				close();
			} else {
				error = 'Error al comentar artículo';
			}
		} catch (err) {
			console.error('[CreateCommentModal]', err);

			if (err instanceof ZodError) {
				error = err.issues[0];
			}

			error = 'Error al comentar artículo';
		}
	}
</script>

{#if isOpen}
	<Modal {close} name="Comentar artículo" class="mobile:w-[90vw] tablet:w-[40vw]">
		<form onsubmit={onSubmit} class="flex flex-col gap-y-8">
			<Textarea
				placeholder="¡Muy buen artículo!"
				name="content"
				minlength={3}
				maxlength={255}
				required>Tu comentario</Textarea
			>

			<ErrorMessage value={error} />

			<Button type="submit">Comentar</Button>
		</form>
	</Modal>
{/if}
