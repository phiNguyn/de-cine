import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"

export  const  App  = () => {
  return (
   <>
   <div className="max-w-[1440px] py-5 my-0 mx-auto bg-[rgb(16, 16, 16)]">
   <Header/>
   <main className="w-full ">
   <Routes>
    <Route path="/" element = {<Home/>}/>
   </Routes>
   </main>
   </div>
   <Footer/>
   </>
  )
}
