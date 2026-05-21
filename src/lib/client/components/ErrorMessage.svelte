<script lang="ts">
import type { $ZodIssue } from 'zod/v4/core'
import { isActionFailure, type ActionFailure } from '@sveltejs/kit'
import { parseErrorCode } from 'client/utilities/parse-error-code.utility'
import { parseZodIssue } from 'client/utilities/parse-zod-issue.utility'
import { isErrorCode } from 'shared/utilities/is-error-code.utility'
import { isZodIssue } from 'shared/utilities/is-zod-issue.utility'

const { value }: { value?: string | $ZodIssue | ActionFailure } = $props()
</script>

{#if isZodIssue(value)}
    <p class="text-brand-red">{parseZodIssue(value)}</p>
{:else if isErrorCode(value)}
    <p class="text-brand-red">{parseErrorCode(value)}</p>
{:else if isActionFailure(value)}
    <p class="text-brand-red">{value.data}</p>
{:else}
    <p class="text-brand-red">{value}</p>
{/if}
