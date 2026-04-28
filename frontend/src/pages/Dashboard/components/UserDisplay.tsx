import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { UsersService } from '../../../services/users.service'
import { useQueryClient } from '@tanstack/react-query'
import type { UserOut } from '../../../../../shared/src/dtos/out/user-out.dto'
import type { UserRole } from '../../../../../shared/src/models/user-role.model'

export function UserDisplay({ user }: { user: UserOut }) {
	const [newRole, setNewRole] = useState<UserRole>(user.role)
	const queryClient = useQueryClient()

	const onSelectNewRole = (event: ChangeEvent<HTMLSelectElement>) => {
		const newRole = event.target.value as UserRole
		setNewRole(newRole)
	}

	const onSaveNewRole = async () => {
		if (newRole === user.role) return

		try {
			await UsersService.updateRole(user.id, newRole)

			queryClient.invalidateQueries({ queryKey: ['users'] })
		} catch (error) {
			console.error(error)
			alert('Error actualizando rol')
		}
	}

	return (
		<tr key={user.id} className='odd:bg-white even:bg-gray-50'>
			<td className='p-3 border'>{user.name}</td>
			<td className='p-3 border font-mono text-xs'>{user.id}</td>
			<td className='p-3 border'>{user.role}</td>
			<td className='p-3 border'>
				<div className='flex items-center gap-2'>
					<select
						defaultValue={user.role}
						className='border rounded px-2 py-1'
						onChange={onSelectNewRole}
					>
						<option value='USER'>USER</option>
						<option value='AUTHOR'>AUTHOR</option>
						<option value='ADMIN'>ADMIN</option>
					</select>
					<button
						type='button'
						className='px-3 py-1 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700'
						onClick={onSaveNewRole}
					>
						Guardar
					</button>
				</div>
			</td>
		</tr>
	)
}
