import Banner from "../component/Home/Banner"
import ListFilm from "../component/Home/ListFilm"
import { FC } from "react"
import Promotions from "../component/Home/Promotions"


const Home: FC = () => {



  return (
    <div className="w-full  mx-auto">
      <Banner />

      <ListFilm className="   2xl:max-w-[1440px] mx-auto px-5" />

      <Promotions className="max-w-[1440px] mx-auto">
        {/* de thong tin vao day */}
      </Promotions>
    </div>
  )
}
export default Home