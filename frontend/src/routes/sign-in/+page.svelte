<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Input from '$lib/components/Input.svelte';
	import Page from '$lib/components/Page.svelte';

	const { form } = $props();
</script>

<Page>
	<Hero title="Sesión" description="Entrá a tu cuenta" />

	<section class="mb-10 w-[clamp(300px,100%,800px)]">
		<form
			method="POST"
			class="flex w-full flex-col gap-y-3"
			use:enhance={() => {
				return async ({ result, update }) => {
					await update();

					if (result.type === 'success') {
						goto('/account');
					}
				};
			}}
		>
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
				¿No tenés cuenta?
				<a href="/sign-up" class="cursor-pointer underline hover:text-gray-900">Creá una cuenta</a>
			</p>

			<Button type="submit" class="w-full">Iniciar sesión</Button>
		</form>
	</section>
</Page>
