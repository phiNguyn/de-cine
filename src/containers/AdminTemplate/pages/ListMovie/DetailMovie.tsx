import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/Layout/layout";
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import { UserNav } from "../../components/user-nav";
import toast, { Toaster } from "react-hot-toast";
import { DatePickerWithRange } from "../../components/data-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditMovie, { MovieFormValues } from './component/editMovie';
import moviesAPI from "@/apis/movie";
import { useMovieStore } from "@/store/Movie";
import Detail from "@/containers/ClientTemplate/component/Film/Detail";
import { useParams } from "react-router-dom";


export default function EditMoviePage() {
  const { id } = useParams()
  const { updateMovie, getMovieById } = useMovieStore((state) => state)
  const movie = getMovieById(Number(id))

  const handleSubmit = async (data: MovieFormValues) => {
    console.log("update ", data);

    // const formData = new FormData;
    // formData.append('movie_name', data.movie_name);
    // // formData.append('price', data.price);
    // formData.append('description', data.description);
    // formData.append('duration', data.duration);
    // formData.append('release_date', data.release_date);
    // formData.append('country', data.country);
    // formData.append('producer', data.producer);
    // formData.append('director', data.director);
    // formData.append('cast', data.cast);
    // data.genres.forEach((genre) => {
    //   formData.append('genres[]', genre);
    // });
    // formData.append('status', data.status);
    // formData.append('youtube_url', data.youtube_url);
    // if (data.image_main != null) {
    //   formData.append('image_main', data.image_main);
    // }
    // if (data.poster_url != null) {

    //   formData.append('poster_url', data.poster_url);
    // }

    const {
      cast,
      country,
      description,
      director,
      duration,
      genres,
      movie_name,
      producer,
      release_date,
      status,
      youtube_url,
      id_movie,
      image_main,
      imgOld,
      posterOld,
      poster_url
    } = data;

    const updateData = {
      cast,
      country,
      description,
      director,
      duration,
      genres,
      movie_name,
      producer,
      release_date,
      status,
      youtube_url,
      id_movie,
      imgOld,
      posterOld,
      // Chỉ thêm `image_main` và `poster_url` nếu chúng không phải null hoặc undefined
      ...(image_main && { image_main }),
      ...(poster_url && { poster_url })
    };


    try {
      const resp = await moviesAPI.updateMovie(Number(data.id_movie), updateData)
      if (resp?.status == 200) {
        toast.success("Cập nhật thành công")
        console.log(resp.data.movie);
        
        // updateMovie(resp.data.movie)
      }

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Layout.Header>
          <div className='ml-auto flex items-center space-x-4'>
            <Dropdown className='!mt-0 px-2 cursor-pointer' />
            <UserNav />
          </div>
        </Layout.Header>
        <Layout.Body>

          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>Phim {movie?.movie_name}</h1>
            <div className='flex w-fit items-center space-x-5'>
              <DatePickerWithRange className='w-fit' />
              {/* <Button>Download</Button> */}
            </div>
          </div>
          <Tabs
            orientation='vertical'
            defaultValue='overview'
            className='space-y-4'
          >
            <div className='w-full flex justify-between overflow-x-auto pb-2'>
              <TabsList>
                <TabsTrigger value='overview'>Chi tiết</TabsTrigger>
                <TabsTrigger value='analytics'>Doanh thu</TabsTrigger>
                <TabsTrigger value='reports'>Reports</TabsTrigger>
                <TabsTrigger value='edit'>Chỉnh sửa</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value='overview' className='space-y-4'>
              <Detail className="!bg-none" movie={movie} />
            </TabsContent>
            <TabsContent value='edit' className='space-y-4'>
              <div className="container mx-auto ">
                <EditMovie onSubmit={handleSubmit} />
              </div>
            </TabsContent>
          </Tabs>
          <Toaster />
        </Layout.Body>
      </Layout>
    </ThemeProvider>
  )
}