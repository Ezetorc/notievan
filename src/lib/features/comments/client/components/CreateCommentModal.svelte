<script lang="ts">
import Button from 'client/components/Button.svelte'
import ErrorMessage from 'client/components/ErrorMessage.svelte'
import Modal from 'client/components/Modal.svelte'
import Textarea from 'client/components/Textarea.svelte'
import { HttpService } from 'client/services/http.service'
import { CommentOut } from 'comments/models/comment-out.dto'
import { CreateCommentSchema } from 'comments/schemas/create-comment.schema'
import { ZodError } from 'zod'
import type { $ZodIssue } from 'zod/v4/core'

const {
	isOpen,
	close,
	articleId,
	onCommentCreated
}: {
	articleId: string
	close: () => void
	isOpen: boolean
	onCommentCreated: (comment: CommentOut) => void
} = $props()
let error = $state<string | $ZodIssue | undefined>()

async function onSubmit(event: SubmitEvent) {
	event.preventDefault()
	const formData = new FormData(event.target as HTMLFormElement)
	const content = formData.get('content') as string

	try {
		const result = CreateCommentSchema.parse({ content, articleId })
		const newComment = await HttpService.post<CommentOut>({
			url: '/api/comments',
			body: result
		})

		if (newComment) {
			onCommentCreated(newComment)
			close()
		} else {
			error = 'Error al comentar artículo'
		}
	} catch (err) {
		console.error('[CreateCommentModal]', err)

		if (err instanceof ZodError) {
			error = err.issues[0]
			return
		}

		error = 'Error al comentar artículo'
	}
}
</script>

{#if isOpen}
    <Modal
        {close}
        name="Comentar artículo"
        class="mobile:w-[90vw] tablet:w-[40vw]"
    >
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
