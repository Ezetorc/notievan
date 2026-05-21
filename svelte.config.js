import adapter from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) =>
			filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
	kit: {
		adapter: adapter(),
		alias: {
			'shared/*': 'src/lib/shared/*',
			'server/*': 'src/lib/server/*',
			'client/*': 'src/lib/client/*',
			'articles/*': 'src/lib/features/articles/*',
			'auth/*': 'src/lib/features/auth/*',
			'comments/*': 'src/lib/features/comments/*',
			'tokens/*': 'src/lib/features/tokens/*',
			'users/*': 'src/lib/features/users/*'
		}
	}
}

export default config
