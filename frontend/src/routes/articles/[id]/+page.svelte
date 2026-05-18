<script lang="ts">
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { type ModalProps, modals } from 'svelte-modals'
import Article from '$lib/components/Article.svelte'
import Page from '$lib/components/Page.svelte'
import { ROUTES } from '$lib/configuration/routes.configuration'
import { userStore } from '$lib/stores/user.store'
import type { PageData } from './$types'
import ArticleComments from './ArticleComments.svelte'
import DeleteArticleModal from './DeleteArticleModal.svelte'

const { data }: { data: PageData } = $props()
const article = $derived(data.article)
const isAuthor = $derived($userStore?.id === article.author.id)
const html = $derived(
	DOMPurify.sanitize(marked.parse(article.content) as string)
)
</script>

<Page>
	<article class="mb-50" id="article-section">
		{#if isAuthor}
			<div class="mt-5 space-x-5 text-2xl">
				<a href={ROUTES.EditArticle(article.id)} class="transition-transform hover:-translate-y-1"
					>Editar</a
				>

				<button
					type="button"
					onclick={() =>
						modals.open<ModalProps & { articleId: string }>(DeleteArticleModal, {
							articleId: article.id
						})}
					class="cursor-pointer text-brand-red
						transition-transform hover:-translate-y-1"
				>
					Eliminar
				</button>
			</div>
		{/if}

		<h1 class="mt-5 mb-2.5 font-title text-7xl text-[#0e1c40]">
			{article.title}
		</h1>
		<h2 class="mb-3.75 text-3xl text-gray-600">
			{article.description}
		</h2>
		<h3 class="mb-7.5 text-[18px] text-gray-600">Por {article.author.name}</h3>

		<div class="grid gap-x-10 gap-y-10 desktop:grid-cols-[2fr_1fr]">
			<div class="overflow-x-auto">
				<article
					class="prose prose-lg prose-slate space-y-6 text-2xl leading-relaxed text-pretty wrap-break-word text-gray-800"
				>
					{@html html}
				</article>

				<ArticleComments {data} />
			</div>

			<div class="flex flex-col gap-y-6">
				{#each data.asideArticles as asideArticle (asideArticle.id)}
					<Article article={asideArticle} />
				{/each}
			</div>
		</div>
	</article>
</Page>
