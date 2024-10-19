import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { ThemeProvider } from "./components/theme-provider"
import DetailMoviePage from "./pages/Detail"

export  const  App  = () => {
  return (
   <>
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
   <Header/>
   <Routes>
    <Route path="/" element = {<Home/>}/>
    <Route path="/dat-ve/:id" element = {<DetailMoviePage/>}/>
   </Routes>
   <Footer/>
   </ThemeProvider>
   </>
  )
}
