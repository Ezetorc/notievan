<script lang="ts">
import { ARTICLE_WRITER_ROLES } from 'shared/configuration/article-writer-roles.configuration'
import type { UserOut } from 'shared/dtos/out/user-out.dto'
import { ROUTES } from '$lib/configuration/routes.configuration'
import notievanLogoImage from '../assets/images/notievan-logo.webp'
import HeaderLink from './HeaderLink.svelte'
import InstagramIcon from './icons/InstagramIcon.svelte'

const { user }: { user: UserOut | null } = $props()
</script>

<header
	class="sticky top-0 left-0 z-20 flex h-20 w-full items-center justify-center
         bg-linear-to-r from-brand-blue to-[#0d3ea8] drop-shadow-2xl"
>
	<div
		class="flex w-full max-w-317.5 min-w-[320px] items-center justify-between gap-x-1.25 text-2xl text-white mobile:px-4 tablet:px-10 desktop:px-0"
	>
		<nav class="flex items-center mobile:gap-x-3 desktop:gap-x-10" id="header-buttons">
			<HeaderLink href={ROUTES.Home}>
				<img class="aspect-square max-w-13" alt="Logo de NotiEvan" src={notievanLogoImage} />
			</HeaderLink>

			{#if user}
				<HeaderLink href={ROUTES.Account}>Cuenta</HeaderLink>

				{#if ARTICLE_WRITER_ROLES.includes(user.role)}
					<HeaderLink href={ROUTES.CreateArticle}>Crear</HeaderLink>
				{/if}

				{#if user.role === 'ADMIN'}
					<HeaderLink href={ROUTES.Users}>Usuarios</HeaderLink>
				{/if}
			{:else}
				<HeaderLink href={ROUTES.SignIn}>Ingresar</HeaderLink>
			{/if}
		</nav>

		<HeaderLink
			class="mobile:scale-90 desktop:scale-100"
			ariaLabel="Instagram"
			href="https://www.instagram.com/noti.evan"
			target="_blank"
		>
			<InstagramIcon />
		</HeaderLink>
	</div>
</header>
