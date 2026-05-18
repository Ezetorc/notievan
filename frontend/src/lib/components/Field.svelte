<script lang="ts">
const { name, value }: { name: string; value: string } = $props()
</script>

<li class="flex flex-col gap-y-2">
	<h3 class="font-semibold mobile:text-[24px] tablet:text-2xl">
		{name}
	</h3>
	<div class="mobile:text-[18px] tablet:text-xl">{value}</div>
</li>
