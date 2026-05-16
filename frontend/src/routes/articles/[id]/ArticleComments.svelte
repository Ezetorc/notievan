<script lang="ts">
	import ArticleComment from '$lib/components/ArticleComment.svelte';
	import Button from '$lib/components/Button.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { observe } from '$lib/utilities/observe.utility';
	import { modals, type ModalProps } from 'svelte-modals';
	import type { PageData } from './$types';
	import CreateCommentModal from './CreateCommentModal.svelte';
	import { CommentOut } from 'shared/dtos/out/comment-out.dto';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import type { PaginatedResult } from 'shared/models/paginated-result.model';
	import { userStore } from '$lib/stores/user.store';
	import { ServerApiService } from '$lib/services/server-api.service';

	const { data }: { data: PageData } = $props();

	let comments = $derived(data.initialComments);
	let cursor = $derived<string | null>(data.initialCommentsCursor);
	let loading = $state(false);
	let hasMore = $derived(Boolean(cursor));

	async function loadMore() {
		if (!hasMore || loading) return;

		loading = true;

		const search = new SvelteURLSearchParams();

		if (cursor) {
			search.set('cursor', cursor);
		}

		search.set('limit', '3');

		const response = await ServerApiService.get<PaginatedResult<CommentOut>>({
			url: `/comments/article/${data.article.id}?${search}`
		});

		comments = [...comments, ...response.data];
		cursor = response.nextCursor;
		hasMore = Boolean(cursor);
		loading = false;
	}

	function onCommentCreated(comment: CommentOut): void {
		comments = [comment, ...comments];
	}

	function onCommentDeleted(commentId: string): void {
		comments = comments.filter((comment) => comment.id !== commentId);
	}

	function onCommentCreateClicked(): void {
		if ($userStore) {
			modals.open<
				ModalProps & { articleId: string; onCommentCreated: (comment: CommentOut) => void }
			>(CreateCommentModal, {
				articleId: data.article.id,
				onCommentCreated
			});
		} else {
			goto(resolve('/sign-in', {}));
		}
	}
</script>

<section class="my-9 w-full">
	<Button
		onclick={onCommentCreateClicked}
		class="clickable my-6 w-full rounded-sm bg-brand-orange py-3 text-2xl font-bold text-white"
	>
		Comentar
	</Button>

	<main class="flex flex-col gap-y-4">
		{#each comments as comment (comment.id)}
			<ArticleComment {comment} {onCommentDeleted} />
		{/each}
	</main>

	{#if hasMore}
		<div class="flex w-full justify-center">
			<LoadingSpinner attach={(element) => observe(element, loadMore)} />
		</div>
	{/if}
</section>
