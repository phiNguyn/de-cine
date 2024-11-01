
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeRoutes from "@/routes"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
     <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeRoutes />
      </Router>
     </QueryClientProvider>
    </>
  )
}
