
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "@/routes"
    import UserProfile from "./pages/UserProfile"
import { SeatSelection } from "./pages/Seat"
import DetailMoviePage from "./pages/Detail"

export const App = () => {
  return (
    <>
      <Router>
        <Routes />
        <Route path="/" element = {<Home/>}/>
    <Route path="/UserProfile" element = {<UserProfile/>}/>
    <Route path="/Seat" element = {<SeatSelection/>}/>
    <Route path="/dat-ve/:id" element = {<DetailMoviePage/>}/>
      </Router>
    </>
  )
}
