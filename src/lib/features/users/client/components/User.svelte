<script lang="ts">
import { type ModalProps, modals } from 'svelte-modals'
import ChangeRoleModal from './ChangeRoleModal.svelte'
import Button from 'client/components/Button.svelte'
import type { UserOut } from 'users/models/user-out.dto'
import type { UserRole } from 'users/models/user-role.model'

const {
	user,
	onRoleChange
}: {
	user: UserOut
	onRoleChange: (userId: string, newRole: UserRole) => void
} = $props()

function openModal() {
	modals.open<
		ModalProps & {
			user: UserOut
			onRoleChange: (userId: string, newRole: UserRole) => void
		}
	>(ChangeRoleModal, { user: user, onRoleChange })
}
</script>

<tr class="mobile:text-sm tablet:text-xl desktop:text-2xl">
	<td class="border p-3 text-left">{user.name}</td>
	<td class="flex items-center justify-between border p-3 text-left"
		>{user.role}
		<Button onclick={openModal} class="mobile:text-sm tablet:text-xl desktop:text-2xl"
			>Cambiar</Button
		></td
	>
</tr>
