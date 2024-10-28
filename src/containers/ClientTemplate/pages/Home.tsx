import Banner from "../component/Home/Banner"
import ListFilm from "../component/Home/ListFilm"
import { FC } from "react"


const Home: FC = () => {
  return (
    <div className="w-full ">
      <Banner />

      <ListFilm />
    </div>
  )
}
export default Home