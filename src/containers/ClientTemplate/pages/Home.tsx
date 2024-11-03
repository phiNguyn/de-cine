import Banner from "../component/Home/Banner"
import ListFilm from "../component/Home/ListFilm"
import { FC } from "react"
import Promotions from "../component/Home/Promotions"


const Home: FC = () => {



  return (
    <div className="w-full  mx-auto">
      <Banner />

      <ListFilm  className="max-w-[1440px] mx-auto"/>
      <Promotions className="max-w-[1440px] mx-auto">
        
      </Promotions>
    </div>
  )
}
export default Home