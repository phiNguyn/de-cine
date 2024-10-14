import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { ThemeProvider } from "./components/theme-provider"

export  const  App  = () => {
  return (
   <>
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
   <div className="max-w-[1440px]  my-0 mx-auto">
   <Header/>
   <main className="w-full">
   <Routes>
    <Route path="/" element = {<Home/>}/>
   </Routes>
   </main>
   </div>
   <Footer/>
   </ThemeProvider>
   </>
  )
}
