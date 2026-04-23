import { useState } from 'react'
import { ErrorMessage } from '../../../components/ErrorMessage'

export function EditableUserInfo({
	name,
	value,
	onEdit,
	minLength,
	maxLength,
	error
}: {
	name: string
	value: string
	onEdit?: (newValue: string) => Promise<boolean>
	minLength?: number
	maxLength?: number
	error?: string
}) {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [newValue, setNewValue] = useState<string>(value)

	const handleEdit = () => {
		setIsEditing(true)
	}

	const handleSave = async () => {
		const success = await onEdit?.(newValue.trim())

		if (success) {
			setIsEditing(false)
		}
	}

	return (
		<div className='flex flex-col gap-y-2'>
			<div className='flex items-end'>
				<h3 className='mobile:text-[24px] tablet:text-3xl font-semibold'>
					{name}
				</h3>
				<button
					type='button'
					onClick={isEditing ? handleSave : handleEdit}
					className='bg-brand-orange rounded-[4px] font-bold text-white clickable px-2 whitespace-nowrap ml-4'
				>
					{isEditing ? 'Guardar' : 'Editar'}
				</button>
			</div>

			{isEditing ? (
				<input
					type='text'
					className='mobile:text-[18px] tablet:text-2xl mobile:max-w-[80%] tablet:max-w-[55%] px-2 py-1 bg-gray-300'
					defaultValue={value}
					onChange={(e) => setNewValue(e.target.value)}
					minLength={minLength}
					maxLength={maxLength}
				/>
			) : (
				<div className='mobile:text-[18px] tablet:text-2xl'>{value}</div>
			)}

			<ErrorMessage value={error} />
		</div>
	)
}
