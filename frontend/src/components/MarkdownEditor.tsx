import EasyMDE from 'easymde'
import { useEffect, useRef } from 'react'
import 'easymde/dist/easymde.min.css'

interface MarkdownEditorProps {
	value?: string
	placeholder?: string
	autofocus?: boolean
	onChange?: (value: string) => void
	minHeight?: string
}

export function MarkdownEditor({
	value = '',
	placeholder = 'Escribí algo...',
	autofocus = false,
	onChange,
	minHeight = '520px'
}: MarkdownEditorProps) {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)
	const editorRef = useRef<EasyMDE | null>(null)

	useEffect(() => {
		if (!textareaRef.current) {
			return
		}

		const editor = new EasyMDE({
			element: textareaRef.current,
			initialValue: value,
			placeholder,
			spellChecker: false,
			autofocus,
			status: false,
			minHeight,
			toolbar: [
				'preview',
				'|',
				'bold',
				'italic',
				'heading',
				'|',
				'quote',
				'unordered-list',
				'ordered-list',
				'|',
				'link',
				'image',
				'table',
				'|',
				'guide'
			]
		})

		const wrapper = editor.codemirror.getWrapperElement()
		wrapper.style.fontSize = '24px'
		wrapper.style.lineHeight = '1.6'

		editor.codemirror.on('change', () => {
			onChange?.(editor.value())
		})

		editorRef.current = editor

		return () => {
			editor.toTextArea()
			editorRef.current = null
		}
	}, [autofocus, value, minHeight, placeholder])

	useEffect(() => {
		if (editorRef.current && value !== editorRef.current.value()) {
			editorRef.current.value(value)
		}
	}, [value])

	return <textarea maxLength={5000} minLength={1} ref={textareaRef} />
}
