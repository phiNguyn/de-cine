import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "@/routes"
export const App = () => {
  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  )
}
