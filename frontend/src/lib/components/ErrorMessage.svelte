<script lang="ts">
import type { $ZodIssue } from 'zod/v4/core'
import { isErrorCode } from '$lib/utilities/is-error-code.utility'
import { isZodIssue } from '$lib/utilities/is-zod-issue.utility'
import { parseErrorCode } from '$lib/utilities/parse-error-code.utility'
import { parseZodIssue } from '$lib/utilities/parse-zod-issue.utility'

const { value }: { value?: string | $ZodIssue } = $props()
</script>

{#if isZodIssue(value)}
	<p class="text-brand-red">{parseZodIssue(value)}</p>
{:else if isErrorCode(value)}
	<p class="text-brand-red">{parseErrorCode(value)}</p>
{:else}
	<p class="text-brand-red">{value}</p>
{/if}
