<script lang="ts">
	import Button from './Button.svelte';
	import compressFile, { type Options } from 'browser-image-compression';

	interface Props {
		maxSizeMB?: Options['maxSizeMB'];
		maxWidthOrHeight?: Options['maxWidthOrHeight'];
		fileType?: Options['fileType'];
		oninput: (image: File | string) => void;
		value?: string;
	}

	const {
		maxSizeMB = 0.3,
		maxWidthOrHeight = 1200,
		fileType = 'image/webp',
		oninput,
		value: initialValue = ''
	}: Props = $props();

	let imageMode = $state<'url' | 'file'>('url');
	let preview = $state<string>('');
	let loading = $state<boolean>(false);

	$effect(() => {
		if (initialValue) {
			preview = initialValue;
			imageMode = 'url';
		}
	});

	async function onSelectFile(event: Event) {
		const target = event.target as HTMLInputElement;
		const selectedFile = target.files?.[0];

		if (!selectedFile) {
			return;
		}

		loading = true;

		try {
			const compressedFile = await compressFile(selectedFile, {
				maxSizeMB,
				maxWidthOrHeight,
				useWebWorker: true,
				fileType
			});
			const previewUrl = URL.createObjectURL(compressedFile);
			preview = previewUrl;

			const file = new File([compressedFile], 'image.webp', {
				type: 'image/webp'
			});

			oninput(file);
		} catch (err) {
			console.error('Error al procesar imagen', err);
		} finally {
			loading = false;
		}
	}

	function onSelectUrl(event: Event) {
		const target = event.target as HTMLInputElement;
		preview = target.value;

		oninput(target.value);
	}
</script>

<div class="flex w-75 flex-col gap-y-2">
	<header class="mb-2 flex gap-2">
		<Button
			class="flex-1 rounded-md px-4 py-2 text-[1.2rem] font-semibold"
			variant={imageMode === 'url' ? 'default' : 'unselected'}
			onclick={() => {
				imageMode = 'url';
				preview = '';
			}}
		>
			Usar URL
		</Button>

		<Button
			class="flex-1 rounded-md px-4 py-2 text-[1.2rem] font-semibold"
			variant={imageMode === 'file' ? 'default' : 'unselected'}
			onclick={() => {
				imageMode = 'file';
				preview = '';
			}}
		>
			Subir archivo
		</Button>
	</header>

	<main class="flex flex-col gap-2">
		{#if imageMode === 'url'}
			<input
				type="url"
				placeholder="Pegá la URL de la imagen"
				class="rounded-md border bg-white p-2"
				value={preview}
				oninput={onSelectUrl}
			/>

			{#if preview}
				<img
					src={preview}
					alt="Vista previa"
					class="aspect-video max-h-100 w-full max-w-75 rounded-md border border-gray-300 object-cover"
				/>
			{:else}
				<div
					class="aspect-video max-h-100 w-full max-w-75 rounded-md border border-gray-300 bg-brand-gray object-cover"
				></div>
			{/if}
		{:else}
			<input type="file" id="image-input" accept="image/*" class="hidden" oninput={onSelectFile} />

			<label for="image-input" class="flex cursor-pointer flex-col gap-y-2">
				<div class="aspect-video max-h-100 max-w-75 bg-gray-200">
					{#if loading}
						<div class="flex h-full w-full items-center justify-center">
							<span class="text-gray-500">Procesando...</span>
						</div>
					{:else if preview}
						<img src={preview} alt="Vista previa" class="h-full w-full object-cover" />
					{:else}
						<div
							class="flex aspect-video max-h-100 w-full max-w-75 items-center justify-center rounded-md border border-gray-300 bg-brand-gray object-cover text-2xl text-white"
						>
							Click para elegir portada
						</div>
					{/if}
				</div>
			</label>
		{/if}
	</main>
</div>
