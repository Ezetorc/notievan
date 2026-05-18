<script lang="ts">
interface Props {
	title: string
	description: string
}

const { title, description }: Props = $props()
</script>

<section
	class="my-10 flex gap-x-7 overflow-hidden mobile:flex-col tablet:flex-row tablet:items-center"
>
	<h1 class="mt-3.75 font-title text-brand-blue mobile:text-8xl desktop:text-9xl">
		{title}
	</h1>

	<hr class="h-25 w-1.25 bg-brand-blue mobile:hidden tablet:block" />

	<h2 class="w-[20ch] text-brand-blue mobile:text-2xl desktop:text-3xl">
		{description}
	</h2>
</section>
