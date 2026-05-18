<script lang="ts">
import { UpdateUserDto } from 'shared/dtos/in/update-user.dto'
import type { UserOut } from 'shared/dtos/out/user-out.dto'
import type { UserRole } from 'shared/models/user-role.model'
import { ZodError } from 'zod'
import type { $ZodIssue } from 'zod/v4/core'
import { enhance } from '$app/forms'
import Button from '$lib/components/Button.svelte'
import ErrorMessage from '$lib/components/ErrorMessage.svelte'
import Modal from '$lib/components/Modal.svelte'
import { ClientApiService } from '$lib/services/client-api.service'

const {
	isOpen,
	close,
	user,
	onRoleChange
}: {
	close: () => void
	isOpen: boolean
	user: UserOut
	onRoleChange: (userId: string, newRole: UserRole) => void
} = $props()
let error = $state<string | $ZodIssue | undefined>()

async function onSubmit(event: SubmitEvent) {
	event.preventDefault()
	const formData = new FormData(event.target as HTMLFormElement)
	const role = formData.get('role') as UserRole

	if (user.role === role) {
		error = 'El rol no puede ser igual al actual'
		return
	}

	try {
		const result = UpdateUserDto.parse({ role })
		const success = await ClientApiService.patch<boolean>({
			url: `/users/${user.id}`,
			body: result
		})

		if (success) {
			onRoleChange(user.id, role)
			close()
		} else {
			error = 'Error al cambiar el rol'
		}
	} catch (err) {
		console.error('[ChangeRoleModal]', err)

		if (err instanceof ZodError) {
			error = err.issues[0]
		}

		error = 'Error al cambiar el rol'
	}
}
</script>

{#if isOpen}
	<Modal {close} name="Cambiar rol de usuario" class="mobile:w-[90vw] tablet:w-[40vw]">
		<form onsubmit={onSubmit} use:enhance class="flex flex-col gap-y-2">
			<label for="role-selector" class="text-3xl font-bold">Nuevo rol</label>
			<select
				class="mb-5 max-w-75 cursor-pointer rounded-sm bg-brand-orange p-2 text-3xl"
				id="role-selector"
				name="role"
			>
				<option value="USER">Usuario</option>
				<option value="AUTHOR">Autor</option>
				<option value="ADMIN">Administrador</option>
			</select>

			<ErrorMessage value={error} />

			<Button type="submit">Cambiar</Button>
		</form>
	</Modal>
{/if}
