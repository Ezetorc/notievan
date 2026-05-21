<script lang="ts">
import Button from 'client/components/Button.svelte'
import ErrorMessage from 'client/components/ErrorMessage.svelte'
import Input from 'client/components/Input.svelte'
import Modal from 'client/components/Modal.svelte'
import { HttpService } from 'client/services/http.service'
import type { UserOut } from 'users/models/user-out.dto'
import { ZodError } from 'zod'
import type { $ZodIssue } from 'zod/v4/core'
import { userStore } from '../stores/user.store'
import { UpdateUserSchema } from 'users/schemas/update-user.schema'

const {
	isOpen,
	close,
	user
}: { user: UserOut; close: () => void; isOpen: boolean } = $props()
let error = $state<string | $ZodIssue | undefined>()

async function onSubmit(event: SubmitEvent) {
	event.preventDefault()
	const formData = new FormData(event.target as HTMLFormElement)
	const name = formData.get('name') as string

	if (user.name === name) {
		error = 'El nombre no puede ser igual al actual'
		return
	}

	try {
		const result = UpdateUserSchema.parse({ name })

		const success = await HttpService.patch<boolean>({
			url: `/api/users/${user.id}`,
			body: result
		})

		if (success) {
			userStore.update((current) => {
				if (!current) {
					return current
				}

				return {
					...current,
					name: result.name as string
				}
			})

			close()
		} else {
			error = 'Error al cambiar el nombre'
		}
	} catch (err) {
		console.error('[ChangeNameModal]', err)

		if (err instanceof ZodError) {
			error = err.issues[0]
		}

		error = 'Error al cambiar el nombre'
	}
}
</script>

{#if isOpen}
    <Modal
        {close}
        name="Cambiar nombre"
        class="mobile:w-[90vw] tablet:w-[30vw]"
    >
        <form onsubmit={onSubmit} class="flex flex-col gap-y-8">
            <Input
                placeholder="Juan Pérez"
                type="text"
                minlength={3}
                maxlength={50}
                required
                name="name">Nuevo nombre</Input
            >

            <ErrorMessage value={error} />

            <Button type="submit">Cambiar</Button>
        </form>
    </Modal>
{/if}
