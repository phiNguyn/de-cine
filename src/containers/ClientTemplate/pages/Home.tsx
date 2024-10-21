import Banner from "@/components/Home/Banner"
import ListFilm from "@/components/Home/ListFilm"
import { FC } from "react"


 const  Home : FC  = () => {
  return (
    <div className="w-full ">
      <Banner/>
      
      <ListFilm/>
    </div>
  )
}
export default Home