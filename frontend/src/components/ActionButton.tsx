import type { ReactNode, MouseEvent, ButtonHTMLAttributes } from 'react'

export function ActionButton(props: {
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	children?: ReactNode
	className?: string
	loading?: boolean
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}) {
	const loading = props.loading ?? false
	const type = props.type ?? 'button'

	return (
		<button
			type={type}
			onClick={props.onClick}
			disabled={loading}
			aria-busy={loading}
			className={`clickable rounded-sm disabled:opacity-60 disabled:cursor-not-allowed ${props.className}`}
		>
			{loading ? 'Cargando...' : props.children}
		</button>
	)
}
