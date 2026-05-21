<script lang="ts">
import { SvelteURLSearchParams } from 'svelte/reactivity'
import { type ModalProps, modals } from 'svelte-modals'
import { goto } from '$app/navigation'
import ArticleComment from 'articles/client/components/ArticleComment.svelte'
import Button from 'client/components/Button.svelte'
import LoadingSpinner from 'client/components/LoadingSpinner.svelte'
import { HttpService } from 'client/services/http.service'
import { observe } from 'client/utilities/observe.utility'
import type { CommentOut } from 'comments/models/comment-out.dto'
import { ROUTES } from 'shared/configuration/routes.configuration'
import type { PaginatedResult } from 'shared/models/paginated-result.model'
import { userStore } from 'users/client/stores/user.store'
import type { ArticleOut } from 'articles/models/article-out.model'
import CreateCommentModal from './CreateCommentModal.svelte'

const {
	article,
	initialComments,
	initialCommentsCursor
}: {
	article: ArticleOut
	initialComments: CommentOut[]
	initialCommentsCursor: string | null
} = $props()

let comments = $derived(initialComments)
let cursor = $derived<string | null>(initialCommentsCursor)
let loading = $state(false)
let hasMore = $derived(Boolean(cursor))

async function loadMore() {
	if (!hasMore || loading) return

	loading = true

	const search = new SvelteURLSearchParams()

	if (cursor) {
		search.set('cursor', cursor)
	}

	search.set('limit', '3')

	const response = await HttpService.get<PaginatedResult<CommentOut>>({
		url: `/api/comments/article/${article.id}?${search}`
	})

	comments = [...comments, ...response.data]
	cursor = response.nextCursor
	hasMore = Boolean(cursor)
	loading = false
}

function onCommentCreated(comment: CommentOut): void {
	comments = [comment, ...comments]
}

function onCommentDeleted(commentId: string): void {
	comments = comments.filter((comment) => comment.id !== commentId)
}

function onCommentCreateClicked(): void {
	if ($userStore) {
		modals.open<
			ModalProps & {
				articleId: string
				onCommentCreated: (comment: CommentOut) => void
			}
		>(CreateCommentModal, {
			articleId: article.id,
			onCommentCreated
		})
	} else {
		goto(ROUTES.SignIn)
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
