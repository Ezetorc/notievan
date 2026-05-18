<script lang="ts">
import { enhance } from '$app/forms'
import { goto } from '$app/navigation'
import Button from '$lib/components/Button.svelte'
import ErrorMessage from '$lib/components/ErrorMessage.svelte'
import ImageInput from '$lib/components/ImageInput.svelte'
import Input from '$lib/components/Input.svelte'
import MarkdownEditor from '$lib/components/MarkdownEditor.svelte'
import Page from '$lib/components/Page.svelte'
import { ROUTES } from '$lib/configuration/routes.configuration'
import type { ActionData, PageData } from './$types'

let { data, form }: { data: PageData; form: ActionData } = $props()

let content = $derived(data.article.content)
let image = $derived<File | string>(data.article.image)
</script>

<Page>
	<form
		method="POST"
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
			value={data.article.title}
			class="mobile:text-[20px] tablet:text-2xl">Título</Input
		>

		<Input
			placeholder="Ejemplo: ¿Qué nos espera?"
			name="subtitle"
			minlength={1}
			maxlength={50}
			value={data.article.subtitle}
			class="mobile:text-[20px] tablet:text-2xl">Subtítulo</Input
		>

		<Input
			class="mobile:text-[20px] tablet:text-2xl"
			placeholder="Ejemplo: Nuevas evidencias científicas sobre lo que nos podría pasar"
			name="description"
			value={data.article.description}
			minlength={1}
			maxlength={50}>Descripción</Input
		>

		<div
			class="mt-6 flex w-full flex-col gap-6 tablet:grid tablet:grid-cols-[1fr] tablet:gap-x-10 desktop:grid-cols-[3fr_1fr]"
		>
			<MarkdownEditor
				bind:value={content}
				placeholder="¿Cuándo será el fin del mundo? Es una pregunta interesante y que nos hemos hecho durante siglos..."
			/>

			<aside class="order-1 flex flex-col gap-y-5 md:order-2">
				<ImageInput
					oninput={(value) => {
						image = value;
					}}
					value={data.article.image}
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
					Editar artículo
				</Button>
			</div>
		</div>
	</form>
</Page>
