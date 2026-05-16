<script lang="ts">
	import type { CommentOut } from 'shared/dtos/out/comment-out.dto';
	import { modals, type ModalProps } from 'svelte-modals';
	import { SvelteDate } from 'svelte/reactivity';
	import DeleteCommentModal from '../../routes/articles/[id]/DeleteCommentModal.svelte';
	import { userStore } from '$lib/stores/user.store';

	const {
		comment,
		onCommentDeleted
	}: { comment: CommentOut; onCommentDeleted: (commentId: string) => void } = $props();
	const isAuthor = $derived($userStore?.id === comment.author.id);

	function getDisplayableDate(isoString: string): string {
		const date = new Date(isoString);
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const yesterday = new SvelteDate(today);

		yesterday.setDate(yesterday.getDate() - 1);

		const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());

		if (target.getTime() === today.getTime()) {
			return 'Hoy';
		}

		if (target.getTime() === yesterday.getTime()) {
			return 'Ayer';
		}

		return date.toLocaleDateString('es-AR', {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit'
		});
	}
</script>

<article class="space-y-2 overflow-hidden mobile:w-full tablet:w-[70%]">
	<header class="flex items-center justify-between rounded-tr-2xl">
		<div class="flex gap-x-4">
			<h3 class="text-xl font-bold">{comment.author.name}</h3>
			<h4 class="text-lg">{getDisplayableDate(comment.createdAt)}</h4>
		</div>

		{#if isAuthor}
			<button
				type="button"
				class="cursor-pointer text-brand-red"
				onclick={() =>
					modals.open<
						ModalProps & { commentId: string; onCommentDeleted: (commentId: string) => void }
					>(DeleteCommentModal, {
						commentId: comment.id,
						onCommentDeleted
					})}
			>
				Eliminar
			</button>
		{/if}
	</header>

	<main class="text-xl">{comment.content}</main>
</article>
