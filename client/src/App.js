import "./App.css"
import Pages from "./components/pages/Pages"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
          <Pages />
  </QueryClientProvider>
  )
}

export default App
