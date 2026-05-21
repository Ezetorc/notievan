<script lang="ts">
import Button from 'client/components/Button.svelte'
import ErrorMessage from 'client/components/ErrorMessage.svelte'
import Modal from 'client/components/Modal.svelte'
import { HttpService } from 'client/services/http.service'
import type { UserOut } from 'users/models/user-out.dto'
import type { UserRole } from 'users/models/user-role.model'
import { UpdateUserSchema } from 'users/schemas/update-user.schema'
import { ZodError } from 'zod'
import type { $ZodIssue } from 'zod/v4/core'

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
		const result = UpdateUserSchema.parse({ role })
		const success = await HttpService.patch<boolean>({
			url: `/api/users/${user.id}`,
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
		<form onsubmit={onSubmit} class="flex flex-col gap-y-2">
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
