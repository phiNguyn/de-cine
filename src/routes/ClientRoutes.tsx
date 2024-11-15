import Booking from '@/containers/ClientTemplate/component/Booking/Booking'
import { lazy } from 'react'

const HomeTempalte = lazy(() => import("@/containers/ClientTemplate"))
const Homepage = lazy(() => import("@/containers/ClientTemplate/pages/Home"))
const DetailMoviePage = lazy(() => import("@/containers/ClientTemplate/pages/Detail"))
const UserProfile = lazy(() => import("@/containers/ClientTemplate/pages/UserProfile"))
const SeatSelection = lazy(() => import("@/containers/ClientTemplate/pages/Seat"))
const ClientRoutes = [
    {
        path: '/',
        element: <HomeTempalte />,
        children: [
            {
                path: "",
                element: <Homepage />
            },
            {
                path: 'dat-ve/:id',
                element: <DetailMoviePage />
            },

            {
                path: '/UserProfile', element:
                    //nào làm đăng nhập thì tắt cái này
                    <UserProfile />
                // bật cái dưới đây 

                //     (
                //     <RequireAuth roles={[ ROLE.CLIENT]}>
                //         <UserProfile/>
                //     </RequireAuth>
                //   )
            },

            { path: '/Seat/:id', element: <SeatSelection /> },
            { path: '/Booking', element: <Booking /> }
        ]
    }

]
export default ClientRoutes
