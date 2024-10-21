import { lazy } from 'react'

const HomeTempalte = lazy (() => import("@/containers/ClientTemplate"))
const Homepage = lazy (() => import("@/containers/ClientTemplate/pages/Home"))
const DetailMoviePage = lazy (() => import("@/containers/ClientTemplate/pages/Detail"))
const ClientRoutes = [{

    path: '/',
    element : <HomeTempalte/>,
    children: [
        {
            path: "",
            element : <Homepage/>
        },
        {
            path: 'dat-ve/:id',
            element : <DetailMoviePage/>
        },
    ]
    
    
}]
export default ClientRoutes
