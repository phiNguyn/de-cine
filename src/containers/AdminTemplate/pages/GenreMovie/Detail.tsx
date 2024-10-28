import { Dropdown } from '@/containers/ClientTemplate/component/Auth'
import { Layout } from '@/components/Layout/layout'
import { ThemeProvider } from '@/components/theme-provider'
import { UserNav } from '../../components/user-nav'
import { DatePickerWithRange } from '../../components/data-picker'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import moviesAPI from '@/apis/movie'
import { GenreMovie } from '@/types/movie'

const DetailGenreMovie = () => {
  // const {id} = useParams<{id : number | undefined}>()
  // const [genreMovie, setGenreMovie] = useState<GenreMovie>()
  // useEffect(() => {
  // const fetchGenreMovie = async() => {
  //     const resp = await moviesAPI.getMovieDetails(id)
  //     setGenreMovie(resp)
  // }
  // fetchGenreMovie()
  // },[id])
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        {/* ===== Top Heading ===== */}
        <Layout.Header>
          <div className='ml-auto flex items-center space-x-4'>
            <Dropdown className='!mt-0 px-2 cursor-pointer' />
            <UserNav />
          </div>
        </Layout.Header>

        {/* ===== Main ===== */}
        <Layout.Body>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
            <div className='flex w-fit items-center space-x-5'>
              <DatePickerWithRange className='w-fit' />      <Button>Download</Button>
            </div>
          </div>
          {/* <div>{genreMovie?.Genre_name}</div>
       <div>{genreMovie?.created_at}</div>
       <div>{genreMovie?.updated_at}</div> */}
        </Layout.Body>
      </Layout>
    </ThemeProvider>
  )
}

export default DetailGenreMovie