import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import ts from 'typescript-eslint'
import svelteConfig from './svelte.config.js'

const files = ['src/**/*.{js,ts,svelte}']

export default defineConfig(
	{
		files,
		ignores: ['.svelte-kit', 'build', 'dist', 'node_modules']
	},

	js.configs.recommended,

	...ts.configs.recommended,

	...svelte.configs.recommended,

	{
		files,

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},

		rules: {
			'no-undef': 'off'
		}
	},

	{
		files: ['src/**/*.svelte', 'src/**/*.svelte.ts', 'src/**/*.svelte.js'],

		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	},

	{
		files,

		rules: {
			'svelte/no-navigation-without-resolve': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'svelte/no-at-html-tags': 'off'
		}
	}
)
