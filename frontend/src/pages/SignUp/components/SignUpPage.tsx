import { Hero } from '../../../components/Hero'
import { SignInput } from '../../../components/SignInput'
import { useLocation } from 'wouter'
import {
	SignUpSchema,
	type SignUpFormData
} from '../models/sign-up-form-data.model'
import { useSession } from '../../../hooks/use-session.hook'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { useForm } from '../../../hooks/use-form.hook'

export default function SignUpPage() {
	const [, setLocation] = useLocation()
	const { register } = useSession()

	const onSuccess = async (data: SignUpFormData) => {
		await register(data)
		setLocation('/cuenta')
	}

	const { error, onSubmit, watch } = useForm(onSuccess, SignUpSchema, {
		name: '',
		email: '',
		password: ''
	})

	return (
		<>
			<Hero title='Registro' description='Creá tu cuenta' />

			<section className='w-[clamp(300px,100%,800px)]'>
				<form onSubmit={onSubmit} className='flex w-full flex-col gap-y-6'>
					<SignInput
						name='name'
						placeholder='Juan Pérez'
						type='text'
						onChange={(value) => watch('name', value)}
						minLength={3}
						maxLength={50}
					>
						Nombre completo
					</SignInput>

					<SignInput
						onChange={(value) => watch('email', value)}
						name='email'
						placeholder='juanPEREZ@email.com'
						type='email'
						minLength={6}
						maxLength={100}
					>
						Correo electrónico
					</SignInput>

					<SignInput
						name='password'
						placeholder='juanPEREZ123!'
						type='password'
						minLength={6}
						maxLength={30}
						onChange={(value) => watch('password', value)}
					>
						Contraseña
					</SignInput>

					<ErrorMessage value={error} />

					<button
						type='submit'
						className='w-full cursor-pointer mt-6 bg-brand-orange text-white py-3 px-6 rounded-md shadow serif clickable transition-colors'
					>
						Crear cuenta
					</button>
				</form>

				<p className='text-center text-[18px] text-gray-600 mt-6'>
					¿Tenés cuenta?{' '}
					<a
						href='/sesion'
						className='underline cursor-pointer hover:text-gray-900'
					>
						Iniciá sesión
					</a>
				</p>
			</section>
		</>
	)
}
