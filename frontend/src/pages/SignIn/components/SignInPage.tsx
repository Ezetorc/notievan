import { useLocation } from 'wouter'
import { Hero } from '../../../components/Hero'
import { SignInput } from '../../../components/SignInput'
import {
	SignInSchema,
	type SignInFormData
} from '../models/sign-in-form-data.model'
import { useSession } from '../../../hooks/use-session.hook'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { useForm } from '../../../hooks/use-form.hook'

export default function SignInPage() {
	const [, setLocation] = useLocation()
	const { login } = useSession()

	const onSuccess = async (data: SignInFormData) => {
		await login(data)
		setLocation('/cuenta')
	}

	const { error, onSubmit, watch } = useForm(onSuccess, SignInSchema, {
		email: '',
		password: ''
	})

	return (
		<>
			<Hero title='Sesión' description='Entrá a tu cuenta' />

			<section className='w-[clamp(300px,100%,800px)] mb-10'>
				<form onSubmit={onSubmit} className='flex w-full flex-col gap-y-6'>
					<SignInput
						name='email'
						placeholder='juanPEREZ@email.com'
						type='email'
						onChange={(value) => watch('email', value)}
						minLength={6}
						maxLength={100}
					>
						Correo electrónico
					</SignInput>

					<SignInput
						onChange={(value) => watch('password', value)}
						name='password'
						placeholder='juanPEREZ123!'
						type='password'
						minLength={6}
						maxLength={30}
					>
						Contraseña
					</SignInput>

					<ErrorMessage value={error} />

					<button
						type='submit'
						className='w-full cursor-pointer mt-6 bg-brand-orange clickable text-white py-3 px-6 rounded-md shadow serif hover:bg-gray-800 transition-colors'
					>
						Iniciar sesión
					</button>
				</form>

				<p className='text-center text-[18px] text-gray-600 mt-6'>
					¿No tenés cuenta?{' '}
					<a
						href='/registro'
						className='underline cursor-pointer hover:text-gray-900'
					>
						Creá una cuenta
					</a>
				</p>
			</section>
		</>
	)
}
