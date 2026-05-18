<script lang="ts">
import { Carta, MarkdownEditor } from 'carta-md'
import DOMPurify from 'dompurify'
import 'carta-md/default.css'

interface Props {
	value?: string
	placeholder?: string
}

let { value = $bindable(''), placeholder = 'Write something...' }: Props =
	$props()

let carta = new Carta({
	sanitizer: DOMPurify.sanitize
})
</script>

<MarkdownEditor {carta} bind:value {placeholder} mode="tabs" scroll="sync" />

<style>
	:global(.carta-editor) {
		border-radius: 12px;
		background: white;
		border: 1px solid #e5e7eb;
		overflow: hidden;
	}

	:global(.carta-toolbar) {
		background: var(--color-brand-orange);
		padding: 1.6rem !important;
	}

	:global(.carta-activate) {
		font-size: 1.5rem !important;
	}

	:global(.carta-font-code::placeholder) {
		font-family: 'Quicksand', serif;
		font-size: 1.5rem;
		line-height: 1.9;
		color: var(--color-brand-gray) !important;
	}

	:global(.carta-font-code) {
		font-family: 'Quicksand', serif;
		font-size: 1.5rem;
		line-height: 1.9;
		color: #000;
	}
</style>
