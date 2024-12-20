import { useEffect } from 'react';
import { Layout } from '@/components/Layout/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserNav } from '@/containers/AdminTemplate/components/user-nav';
import { Dropdown } from '@/containers/ClientTemplate/component/Auth';
import { ThemeProvider } from '@/components/theme-provider';
import { useGenreMovieStore } from '@/store/GenreMove';
import moviesAPI from '@/apis/movie';
import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import AddGenreMovie from './add';
import { DataTable } from '../../components/table/data-table';
import Loader from '@/components/loader';

export default function GenreMoviePage() {
  const { genreMovie, setGenreMovie } = useGenreMovieStore()

  const { data, isLoading } = useQuery({
    queryKey: ['genreMovie'],
    queryFn: moviesAPI.getAllGenreMovies,
    staleTime: 30 * 1000,
  });
  useEffect(() => {
    if (data) {
      setGenreMovie(data)
    }
  }, [data, setGenreMovie])
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
            <h1 className='text-2xl font-bold tracking-tight'>Thể loại phim</h1>

          </div>
          <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
            <div className='w-full flex justify-between overflow-x-auto pb-2'>
              <TabsList>
                <TabsTrigger value='overview'>Danh Sách</TabsTrigger>
              </TabsList>
              <AddGenreMovie />

            </div>
            <TabsContent value='overview' className='space-y-4'>
              {
                isLoading ? <Loader /> :
                  <div className="container mx-auto">
                    <DataTable name='thể loại' value='genre_name' columns={columns} data={genreMovie} />
                  </div>
              }
            </TabsContent>
          </Tabs>
        </Layout.Body>
      </Layout>
    </ThemeProvider>
  );
}
