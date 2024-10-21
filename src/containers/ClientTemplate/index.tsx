import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/containers/ClientTemplate/component/Header/index"
import { FC, Suspense } from "react"
import { Outlet } from "react-router-dom"

const HomeTemplate = () => {
  return (
   <>
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <Header />
    <Suspense fallback={<Loading />}>
     <Outlet />
    </Suspense>
     <Footer />
   </ThemeProvider>
   </>
  )
}

export default HomeTemplate

export const Loading :FC =() =>{
  return <p><i>Loading...</i></p>;
}