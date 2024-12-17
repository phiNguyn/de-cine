import Banner from "../component/Home/Banner"
import ListFilm from "../component/Home/ListFilm"
import { FC } from "react"
import Promotions from "../component/Home/Promotions"


const Home: FC = () => {

  return (
    <div className="w-full  mx-auto">
      <Banner />
      <div>


        <ListFilm className="2xl:max-w-screen-xl mx-auto px-5" />
       
      </div>
      <Promotions className="2xl:max-w-screen-xl mx-auto">
        {/* de thong tin vao day */}
      </Promotions>
    </div>
  )
}
export default Home