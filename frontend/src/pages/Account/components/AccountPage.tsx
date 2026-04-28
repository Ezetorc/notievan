import { Hero } from '../../../components/Hero'
import { getDisplayableDate } from '../utilities/get-displayable-date.utility'
import { AccountArticles } from './AccountArticles'
import { EditableUserInfo } from './EditableUserInfo'
import { useSession } from '../../../hooks/use-session.hook'
import { UsersService } from '../../../services/users.service'
import { useQueryClient } from '@tanstack/react-query'
import { UserInfo } from './UserInfo'
import { useState } from 'react'

export default function AccountPage() {
	const { user, logout } = useSession()
	const queryClient = useQueryClient()
	const [error, setError] = useState<string>('')

	if (!user) return

	const handleEditName = async (newValue: string) => {
		if (newValue === user.name.trim()) return true

		try {
			await UsersService.update(user.id, { name: newValue })
			queryClient.setQueryData(['self-user'], { ...user, name: newValue })
			setError('')
			return true
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message)
			}

			return false
		}
	}

	return (
		<>
			<Hero title='Cuenta' description='Mirá y cambiá tu información' />

			<article className='flex flex-col gap-y-16'>
				<div className='flex flex-col gap-y-6 text-lg'>
					<EditableUserInfo
						name='Nombre de usuario'
						value={user.name}
						onEdit={handleEditName}
						error={error}
						minLength={3}
						maxLength={50}
					/>
					<UserInfo
						name='Fecha de creación'
						value={getDisplayableDate(user.createdAt)}
					/>
				</div>

				<button
					type='button'
					onClick={logout}
					className='w-fit px-4 py-3 clickable bg-brand-orange rounded-[4px] text-white text-3xl'
				>
					Cerrar sesión
				</button>
			</article>

			<AccountArticles />
		</>
	)
}
