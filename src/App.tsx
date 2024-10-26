
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeRoutes from "@/routes"

export const App = () => {
  return (
    <>
      <Router>
        <ThemeRoutes />
      </Router>
    </>
  )
}
