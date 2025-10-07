import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export namespace TanStackQuery {
  export function getContext() {
    const queryClient = new QueryClient()
    return {
      queryClient,
    }
  }

  export function Provider({
    children,
    queryClient,
  }: {
    children: React.ReactNode
    queryClient: QueryClient
  }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
}
