import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import App from './App.tsx'
import { queryClient } from './configuration/query-client.configuration.ts'
import { persister } from './configuration/storage-persister.configuration.ts'

const rootElement = document.getElementById('root')

if (!rootElement) {
	throw new Error('Root element not found')
}

persistQueryClient({ queryClient, persister })

createRoot(rootElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</StrictMode>
)
