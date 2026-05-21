<script lang="ts">
import { enhance } from '$app/forms'
import { goto } from '$app/navigation'
import MarkdownEditor from 'client/components/MarkdownEditor.svelte'
import Button from 'client/components/Button.svelte'
import ErrorMessage from 'client/components/ErrorMessage.svelte'
import ImageInput from 'client/components/ImageInput.svelte'
import Input from 'client/components/Input.svelte'
import { ROUTES } from 'shared/configuration/routes.configuration'

import type { ActionData } from './$types'
import Page from 'client/components/Page.svelte'

let { form }: { form: ActionData } = $props()

let content = $state('')
let image = $state<File | string>('')
</script>

<Page>
	<form
		method="POST"
		enctype="multipart/form-data"
		use:enhance={({ formData }) => {
			formData.set('content', content);
			formData.set('image', image);

			return async ({ result, update }) => {
				await update();

				if (result.type === 'success') {
					goto(ROUTES.Article(result.data?.id as string));
				}
			};
		}}
		class="mt-5 flex flex-col gap-y-4 pb-[5vw]"
	>
		<Input
			placeholder="Ejemplo: El Futuro De La Humanidad"
			name="title"
			minlength={1}
			maxlength={50}
			class="mobile:text-[20px] tablet:text-2xl">Título</Input
		>

		<Input
			placeholder="Ejemplo: ¿Qué nos espera?"
			name="subtitle"
			minlength={1}
			maxlength={50}
			class="mobile:text-[20px] tablet:text-2xl">Subtítulo</Input
		>

		<Input
			class="mobile:text-[20px] tablet:text-2xl"
			placeholder="Ejemplo: Nuevas evidencias científicas sobre lo que nos podría pasar"
			name="description"
			minlength={1}
			maxlength={50}>Descripción</Input
		>

		<div
			class="mt-6 flex w-full flex-col gap-6 tablet:grid tablet:grid-cols-[1fr] tablet:gap-x-10 desktop:grid-cols-[3fr_1fr]"
		>
			<MarkdownEditor
			maxLength={5000}
				bind:value={content}
				placeholder="¿Cuándo será el fin del mundo? Es una pregunta interesante y que nos hemos hecho durante siglos..."
			/>

			<aside class="order-1 flex flex-col gap-y-5 md:order-2">
				<ImageInput
					oninput={(value) => {
						image = value;
					}}
					maxSizeMB={0.3}
					maxWidthOrHeight={1200}
					fileType="image/webp"
				/>
			</aside>

			<div class="order-3 w-full">
				<ErrorMessage value={form?.error} />

				<Button
					class="h-12.5 w-full bg-brand-orange text-xl font-bold text-white tablet:h-17.5 tablet:text-3xl"
					type="submit"
				>
					Crear artículo
				</Button>
			</div>
		</div>
	</form>
</Page>
