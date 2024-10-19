import { BreadcrumbComponent } from "@/components/Breadcrumb"
import Detail from "@/components/Film/Detail"
import RootLayout from "@/components/Layout/RootLayout"
import { movie } from "@/types/movie"
import { ShowTimeTabs } from '../components/Film/ShowTimeTabs';
import MovieIsShowing from "@/components/Film/MovieIsShowing";

const DetailMoviePage = () => {
    const movie : movie = {
        id : 1,
        image : 'https://cinema.momocdn.net/img/65599395929739586-Capture-2024-10-03-220855.png',
        name : "Co Dau Hao Mon",
         actor : ["an", "v", "c"],
          country : "Viet Nam",
          decripetion : "Ko co mo ta", 
          director : "ai do",
          genre : "Hai huwocs",
          tag : "18+",
           time : "120 phut",
           year : 2024,
           ytSlug : "x7hgcR3u5xM",
           
    }
    return (
        <div >
            <RootLayout>
            <BreadcrumbComponent href="/dat-ve" prop="Đặt Vé"  title={movie.name}/>
            </RootLayout>
            <Detail movie={movie} />
            <RootLayout className="max-w[1240px] mx-auto grid grid-cols-1 md:grid-cols-[70%_30%] gap-x-5">
            <ShowTimeTabs/>
            <MovieIsShowing className="hidden md:block"/>
            </RootLayout>
        </div>
    )
}

export default DetailMoviePage