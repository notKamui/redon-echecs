import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { routeTree } from './routeTree.gen'
import './styles.css'
import { TanStackQuery } from './lib/query.tsx'
import reportWebVitals from './reportWebVitals.ts'

const tsQueryContext = TanStackQuery.getContext()
const router = createRouter({
  routeTree,
  context: {
    ...tsQueryContext,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanStackQuery.Provider {...tsQueryContext}>
        <RouterProvider router={router} />
      </TanStackQuery.Provider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(import.meta.env.DEV && console.log)
