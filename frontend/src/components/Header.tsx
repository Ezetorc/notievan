import notievanLogoImage from '../assets/images/notievan-logo.webp'
import { INSTAGRAM } from '../configuration/information.configuration'
import { useSession } from '../hooks/use-session.hook'
import { HeaderLink } from './HeaderLink'
import { InstagramIcon } from './icons/InstagramIcon'

export function Header() {
	const { user } = useSession()

	return (
		<header
			className='w-full fixed z-20 top-0 left-0 h-20 flex items-center justify-center
         bg-linear-to-r from-brand-blue to-[#0d3ea8] drop-shadow-2xl'
		>
			<div className='w-full gap-x-[5px] text-white mobile:px-3 desktop:px-0 text-2xl max-w-[1270px] min-w-[320px] flex justify-between items-center'>
				<nav
					className='flex items-center desktop:gap-x-10 mobile:gap-x-[25px]'
					id='header-buttons'
				>
					<HeaderLink href='/'>
						<img
							className='max-w-13 aspect-square'
							alt='Logo de NotiEvan'
							src={notievanLogoImage}
						/>
					</HeaderLink>

					{user ? (
						<>
							<HeaderLink href='/cuenta'>Cuenta</HeaderLink>
							{['AUTHOR', 'ADMIN'].includes(user?.role) && (
								<HeaderLink href='/articulos/nuevo'>Crear</HeaderLink>
							)}
						</>
					) : (
						<HeaderLink href='/registro'>Ingresar</HeaderLink>
					)}
				</nav>

				<HeaderLink
					className='mobile:scale-90 desktop:scale-100'
					aria-label='Instagram'
					href={INSTAGRAM}
					target='_blank'
				>
					<InstagramIcon />
				</HeaderLink>
			</div>
		</header>
	)
}
