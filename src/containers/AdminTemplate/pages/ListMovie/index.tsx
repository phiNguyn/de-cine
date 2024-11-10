
import { ThemeProvider } from "@/components/theme-provider";
import moviesAPI from "@/apis/movie";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { Layout } from "@/components/Layout/layout";
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import { UserNav } from "@/containers/AdminTemplate/components/user-nav";
import { DatePickerWithRange } from "../../components/data-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DataTable } from "../../components/table/data-table";
import { useEffect } from "react";
import { useMovieStore } from "@/store/Movie";


export default function ListMovies() {
  const { movie, setMovie } = useMovieStore((state) => state)

  const { data } = useQuery({
    queryKey: ['movie'],
    queryFn: moviesAPI.getAllMovie,
    staleTime: 60 * 1000
  })
  useEffect(() => {
    if (data) {
      setMovie(data)
    }
  }, [data, setMovie])
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
            <h1 className='text-2xl font-bold tracking-tight'>Phim</h1>
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
                <TabsTrigger value='overview'>Danh Sách</TabsTrigger>
                <TabsTrigger value='analytics'>Biểu Đồ</TabsTrigger>
                <TabsTrigger value='reports'>Reports</TabsTrigger>
                <TabsTrigger value='add'>Thêm phim mới</TabsTrigger>
              </TabsList>
              <Button size={"default"} variant={"default"} ><Link to={'/admin/listMovie/add'}>Thêm phim</Link></Button>
            </div>
            <TabsContent value='overview' className='space-y-4'>
              <div className="container mx-auto ">
                <DataTable name="tên phim" value="movie_name" columns={columns} data={movie} />
              </div>
            </TabsContent>
            {/* <TabsContent value='add' className='space-y-4'>
              <div className="container mx-auto ">
                 <AddMoviePage/>
              </div>
            </TabsContent> */}
          </Tabs>
        </Layout.Body>
      </Layout>
    </ThemeProvider>
  );
}
