import imageCompression from 'browser-image-compression'
import { type ChangeEvent, useState } from 'react'

export function ImageInput({
	onImageSelected,
	value
}: {
	onImageSelected: (image: string | File) => void
	value?: string | File
}) {
	const [preview, setPreview] = useState<string>(
		typeof value === 'string' ? value : ''
	)
	const [imageMode, setImageMode] = useState<'file' | 'url'>('file')
	const [loading, setLoading] = useState(false)

	const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0]
		if (!selectedFile) {
			return
		}

		setLoading(true)

		try {
			const options = {
				maxSizeMB: 0.3,
				maxWidthOrHeight: 1200,
				useWebWorker: true,
				fileType: 'image/webp'
			}

			const compressedFile = await imageCompression(selectedFile, options)

			const previewUrl = URL.createObjectURL(compressedFile)
			setPreview(previewUrl)

			const file = new File([compressedFile], 'image.webp', {
				type: 'image/webp'
			})

			onImageSelected(file)
		} catch (err) {
			console.error('Error al procesar imagen', err)
		} finally {
			setLoading(false)
		}
	}

	const onUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value

		setPreview(value)
		onImageSelected(value)
	}

	return (
		<div className='w-[300px] flex flex-col gap-y-2'>
			<header className='flex gap-2 mb-2'>
				<button
					type='button'
					className={`flex-1 py-2 px-4 clickable rounded-md font-semibold ${
						imageMode === 'file' ? 'bg-brand-orange text-white' : 'bg-gray-200'
					}`}
					onClick={() => {
						setImageMode('file')
						setPreview('')
					}}
				>
					Subir archivo
				</button>

				<button
					type='button'
					className={`flex-1 py-2 px-4 clickable rounded-md font-semibold ${
						imageMode === 'url' ? 'bg-brand-orange text-white' : 'bg-gray-200'
					}`}
					onClick={() => {
						setImageMode('url')
						setPreview('')
					}}
				>
					Usar URL
				</button>
			</header>

			{imageMode === 'file' ? (
				<main>
					<input
						type='file'
						id='image-input'
						accept='image/*'
						className='hidden'
						onChange={onFileChange}
					/>

					<label
						htmlFor='image-input'
						className='cursor-pointer flex flex-col gap-y-2'
					>
						<div className='max-h-[400px] max-w-[300px] aspect-video bg-gray-200'>
							{loading ? (
								<div className='w-full h-full flex items-center justify-center'>
									<span className='text-gray-500'>Procesando...</span>
								</div>
							) : preview ? (
								<img
									src={preview}
									alt='Vista previa'
									className='w-full h-full object-cover'
								/>
							) : (
								<div className='w-full h-full flex items-center justify-center'>
									<span className='text-gray-500 text-lg text-center p-4'>
										Clickeá para elegir la portada
									</span>
								</div>
							)}
						</div>
					</label>
				</main>
			) : (
				<main className='flex flex-col gap-2'>
					<input
						type='url'
						placeholder='Pegá la URL de la imagen'
						className='border rounded-md p-2'
						value={preview}
						onChange={onUrlChange}
					/>

					{preview && (
						<img
							src={preview}
							alt='Vista previa'
							className='w-full max-h-[400px] max-w-[300px] aspect-video rounded-md object-cover border border-gray-300'
						/>
					)}
				</main>
			)}

			<footer className='text-sm text-gray-700 text-center'>
				Se recomienda usar imágenes de 1200x675
			</footer>
		</div>
	)
}
