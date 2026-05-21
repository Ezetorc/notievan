<script lang="ts">
import type { ArticlePreviewOut } from 'articles/models/article-preview-out.model'
import Article from './Article.svelte'

const { articles }: { articles: ArticlePreviewOut[] } = $props()
</script>

<section
	class="my-8 grid grid-cols-1 gap-8
	       mobile:grid-cols-1
	       tablet:grid-cols-3
	       desktop:grid-cols-4"
>
	{#each articles as article (article.id)}
		<Article {article} />
	{/each}
</section>
