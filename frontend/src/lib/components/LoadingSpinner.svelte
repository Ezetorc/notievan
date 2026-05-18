<script lang="ts">
let { attach }: { attach: (element: HTMLElement) => void } = $props()
</script>

<div
	class="aspect-square w-16 animate-spin rounded-full border-4 border-gray-300 border-t-brand-blue"
	{@attach attach}
></div>
