import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/Layout/layout";
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import { UserNav } from "../../components/user-nav";
import toast, { Toaster } from "react-hot-toast";
import { DatePickerWithRange } from "../../components/data-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditMovie from './component/editMovie';
import moviesAPI from "@/apis/movie";
import { useMovieStore } from "@/store/Movie";
import Detail from "@/containers/ClientTemplate/component/Film/Detail";
import { useParams } from "react-router-dom";


export default function EditMoviePage ()  {
  const {id} = useParams()
  const {updateMovie, getMovieById} = useMovieStore((state) => state)
  const movie = getMovieById(Number(id))

  const handleSubmit = async (data) => {
    try {
      const resp = await moviesAPI.updateMovie(data.id_movie, data)
      if(resp?.status == 200) {
        toast.success("Cập nhật thành công")
        updateMovie(resp.data)
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
              <EditMovie onSubmit={handleSubmit}/>
              </div>
            </TabsContent>
          </Tabs>
          <Toaster />
        </Layout.Body>
      </Layout>
    </ThemeProvider>
    )
}