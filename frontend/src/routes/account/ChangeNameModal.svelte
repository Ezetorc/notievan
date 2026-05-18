<script lang="ts">
import { UpdateUserDto } from 'shared/dtos/in/update-user.dto'
import type { UserOut } from 'shared/dtos/out/user-out.dto'
import { ZodError } from 'zod'
import type { $ZodIssue } from 'zod/v4/core'
import Button from '$lib/components/Button.svelte'
import ErrorMessage from '$lib/components/ErrorMessage.svelte'
import Input from '$lib/components/Input.svelte'
import Modal from '$lib/components/Modal.svelte'
import { ClientApiService } from '$lib/services/client-api.service'
import { userStore } from '$lib/stores/user.store'

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
		const result = UpdateUserDto.parse({ name })
		const success = await ClientApiService.patch<boolean>({
			url: `/users/${user.id}`,
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
	<Modal {close} name="Cambiar nombre" class="mobile:w-[90vw] tablet:w-[30vw]">
		<form onsubmit={onSubmit} class="flex flex-col gap-y-8">
			<Input placeholder="Juan Pérez" type="text" minlength={3} maxlength={50} required name="name"
				>Nuevo nombre</Input
			>

			<ErrorMessage value={error} />

			<Button type="submit">Cambiar</Button>
		</form>
	</Modal>
{/if}
