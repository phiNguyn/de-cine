import { ROLE } from '@/constants/role'
import RequireAuth from '@/guards'
import { lazy } from 'react'

const HomeTempalte = lazy (() => import("@/containers/ClientTemplate"))
const Homepage = lazy (() => import("@/containers/ClientTemplate/pages/Home"))
const DetailMoviePage = lazy (() => import("@/containers/ClientTemplate/pages/Detail"))
const UserProfile  =lazy (() => import("@/containers/ClientTemplate/pages/UserProfile"))
const SeatSelectionPage = lazy (() => import("@/containers/ClientTemplate/pages/Seat"))
const ClientRoutes = [
    {
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
                
                {path : '/UserProfile' , element : 
                    //nào làm đăng nhập thì tắt cái này
                    <UserProfile/>
                    // bật cái dưới đây 
            
        //     (
        //     <RequireAuth roles={[ ROLE.CLIENT]}>
        //         <UserProfile/>
        //     </RequireAuth>
        //   )
        },
        
     {path : '/Seat', element :<SeatSelectionPage/> }
    ] 
}
    
]
export default ClientRoutes
