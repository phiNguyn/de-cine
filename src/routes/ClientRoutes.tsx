import { ROLE } from '@/constants/role'
import Booking from '@/containers/ClientTemplate/component/Booking/Booking'
import RequireAuth from '@/guards'
import { lazy } from 'react'

const HomeTempalte = lazy(() => import("@/containers/ClientTemplate"))
const Homepage = lazy(() => import("@/containers/ClientTemplate/pages/Home"))
const DetailMoviePage = lazy(() => import("@/containers/ClientTemplate/pages/Detail"))
const UserProfile = lazy(() => import("@/containers/ClientTemplate/pages/UserProfile"))
const SeatSelection = lazy(() => import("@/containers/ClientTemplate/pages/Seat"))

const MoviesPage = lazy(() => import("@/containers/ClientTemplate/pages/Movies"))
const PaymentsPage = lazy(() => import("@/containers/ClientTemplate/pages/Payment"))
const ProductsPage = lazy(() => import("@/containers/ClientTemplate/pages/Product"))
const UserTicketsPage = lazy(() => import("@/containers/ClientTemplate/component/UserProfile/table"))
const AccountInfoPage = lazy(() => import("@/containers/ClientTemplate/component/UserProfile/index"))
const ResetPasswordPage = lazy(() => import("@/containers/ClientTemplate/pages/ResetPassword"))
const VerifyEmailPage = lazy(() => import("@/containers/ClientTemplate/pages/VerifyEmail"))
const GoogleCallbackPage = lazy(() => import("@/containers/ClientTemplate/pages/GoogleCallback"))
const PaymentResultPage = lazy(() => import("@/containers/ClientTemplate/pages/PaymentResult"))
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

                    (
                        <RequireAuth roles={[ROLE.ADMIN, ROLE.CLIENT]}>
                            <UserProfile />
                        </RequireAuth>
                    )
                , children: [
                    { path: '', index: true, element: <AccountInfoPage /> },

                    { path: 'tickets', element: <UserTicketsPage /> }
                ]
            },
            {
                path: '/Seat/:id', element: (
                    <RequireAuth roles={[ROLE.ADMIN, ROLE.CLIENT]}>
                        <SeatSelection />
                    </RequireAuth>
                )
            },
            { path: '/Booking', element: <Booking /> },
            { path: '/Movies', element: <MoviesPage /> },
            {
                path: '/Payments', element:
                    <RequireAuth roles={[ROLE.ADMIN, ROLE.CLIENT]}>
                        <PaymentsPage />
                    </RequireAuth>
            },
            {
                path: '/products', element:
                    <RequireAuth roles={[ROLE.ADMIN, ROLE.CLIENT]}>
                        <ProductsPage />
                    </RequireAuth>

            },
            { path: 'password-reset', element: <ResetPasswordPage /> },
            { path: 'api/accounts-verify/:code', element: <VerifyEmailPage /> },
            { path: 'api/google-callback', element: <GoogleCallbackPage /> },
            { path: 'payment-result', element: <PaymentResultPage /> }

        ]
    }

]
export default ClientRoutes
