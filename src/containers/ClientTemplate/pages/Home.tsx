import Banner from "../component/Home/Banner"
import ListFilm from "../component/Home/ListFilm"
import { FC } from "react"
import Promotions from "../component/Home/Promotions"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"


const Home: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full  mx-auto">
      <Banner />
      <div>


        <ListFilm className="2xl:max-w-screen-xl mx-auto px-5" />
        <div className="w-full flex justify-center">
          <Button onClick={() => navigate('/movies')} variant={"primary"} size={"default"}>Xem Thêm</Button>
        </div>
      </div>
      <Promotions className="2xl:max-w-screen-xl mx-auto">
        {/* de thong tin vao day */}
      </Promotions>
    </div>
  )
}
export default Home