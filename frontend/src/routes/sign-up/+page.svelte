<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Input from '$lib/components/Input.svelte';
	import Page from '$lib/components/Page.svelte';
	import { ROUTES } from '$lib/configuration/routes.configuration.js';

	const { form } = $props();
</script>

<Page>
	<Hero title="Registro" description="Creá tu cuenta" />

	<section class="mb-10 w-[clamp(300px,100%,800px)]">
		<form
			method="POST"
			use:enhance={() => {
				return async ({ result, update }) => {
					await update();

					if (result.type === 'success') {
						goto(ROUTES.Account);
					}
				};
			}}
			class="flex w-full flex-col gap-y-3"
		>
			<Input name="name" placeholder="Juan Pérez" type="text" minlength={3} maxlength={50} required>
				Nombre
			</Input>

			<Input
				name="email"
				placeholder="juanPEREZ@email.com"
				type="email"
				minlength={6}
				maxlength={100}
				required
			>
				Correo electrónico
			</Input>

			<Input
				name="password"
				placeholder="juanPEREZ123!"
				type="password"
				minlength={6}
				maxlength={30}
				required
			>
				Contraseña
			</Input>

			<ErrorMessage value={form?.error} />

			<p class="text-[18px] text-gray-600">
				¿Ya tenés cuenta?
				<a href={ROUTES.SignIn} class="cursor-pointer underline hover:text-gray-900"
					>Iniciá sesión</a
				>
			</p>

			<Button type="submit" class="w-full">Crear cuenta</Button>
		</form>
	</section>
</Page>
