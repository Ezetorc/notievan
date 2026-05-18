<script lang="ts">
	import type { ArticlePreviewOut } from 'shared/dtos/out/article-preview-out.dto';
	import { isRecent } from '$lib/utilities/is-recent.utility';
	import { ROUTES } from '$lib/configuration/routes.configuration';

	interface Props {
		article: ArticlePreviewOut;
	}

	const { article }: Props = $props();
</script>

<a
	href={ROUTES.Article(article.id)}
	class="group mx-auto block w-full max-w-100 cursor-pointer overflow-hidden transition-transform hover:-translate-y-2"
>
	<div class="relative aspect-video w-full overflow-hidden rounded-sm bg-gray-100">
		{#if isRecent(article.createdAt)}
			<div
				class="absolute top-3 left-3 z-10 rounded-sm bg-brand-red px-3 py-1 text-sm font-bold text-white"
			>
				NUEVO
			</div>
		{/if}

		<img
			loading="lazy"
			src={article.image}
			alt={article.title}
			class="h-full w-full object-cover"
		/>
	</div>

	<div class="mt-4 flex w-full flex-col gap-y-2">
		<div class="flex w-full flex-col gap-y-2">
			<h4 class="text-2xl wrap-break-word text-brand-red">
				{article.subtitle}
			</h4>

			<h3 class="line-clamp-4 font-title text-4xl wrap-break-word text-black">
				{article.title}
			</h3>

			<p class="text-[16px] wrap-break-word text-gray-900">
				{article.description}
			</p>

			<div class="mt-2 line-clamp-4 text-[18px] wrap-break-word text-gray-700">
				{article.author.name}
			</div>
		</div>
	</div>
</a>
