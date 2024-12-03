import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ListFilm from '../component/Home/ListFilm';
const MoviesPage = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <ListFilm className="2xl:max-w-screen-xl mx-auto px-5 mt-10" />
  )
}


export default MoviesPage
