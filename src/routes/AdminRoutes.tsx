// import { ROLE } from "@/constants/role"; 
// import RequireAuth from "@/guards";
import { ROLE } from "@/constants/role";
import RequireAuth from "@/guards";
import { lazy } from "react";
const AppShell = lazy(() => import("@/containers/AdminTemplate/components/app-shell"));
const DashBoard = lazy(() => import("@/containers/AdminTemplate/pages/DashBoard"));
const LoginPage = lazy(() => import("@/containers/AdminTemplate/pages/auth/Login"));
const UsersPage = lazy(() => import('@/containers/AdminTemplate/pages/Account'))
const ListMovies = lazy(() => import("@/containers/AdminTemplate/pages/ListMovie"));
const ListTickets = lazy(() => import("@/containers/AdminTemplate/pages/ListTicket"));
const ListRooms = lazy(() => import("@/containers/AdminTemplate/pages/ListRoom"));
const GenreMoviePage = lazy(() => import("@/containers/AdminTemplate/pages/GenreMovie"))
const AccountDetailPage = lazy(() => import("@/containers/AdminTemplate/pages/Account/Detail"))
const RoomDetail = lazy(() => import("@/containers/AdminTemplate/pages/RoomDetail"));
const TicketDetail = lazy(() => import("@/containers/AdminTemplate/pages/TicketDetail"));
const AddMoviePage = lazy(() => import("@/containers/AdminTemplate/pages/ListMovie/AddMoviePage"))
const EditMoviePage = lazy(() => import("@/containers/AdminTemplate/pages/ListMovie/DetailMovie"))
const ListShowTimePage = lazy(() => import("@/containers/AdminTemplate/pages/ShowTime"))
const Product = lazy(() => import("@/containers/AdminTemplate/pages/Products"))
// Định nghĩa AdminRoutes với kiểu RouteObject
const AdminRoutes = [
  {
    path: 'admin',
    element:
      //  <AppShell />

      // nào làm đăng nhập thì bật cái này lên
      (
        <RequireAuth roles={[ROLE.ADMIN]}>
          <AppShell />
        </RequireAuth>
      )
    ,
    children: [
      {
        path: "",
        element: <DashBoard />
      },
      {
        path: 'users',
        element: <UsersPage />

      },
      { path: 'users/:id', element: <AccountDetailPage /> },
      {
        path: "listMovie",
        element: <ListMovies />
      },
      {
        path: "listMovie/add",
        element: <AddMoviePage />
      },
      { path: 'listMovie/:id', element: <EditMoviePage /> },
      {
        path: "listTicket",
        element: <ListTickets />
      },
      {
        path: "listRoom",
        element: <ListRooms />
      },
      {
        path: 'listGenreMovies',
        element: <GenreMoviePage />
      },

      {
        path: 'listShowTimes',
        element: <ListShowTimePage />
      },
      //detail 
      {
        path: "listRoom/:id",
        element: <RoomDetail />
      },
      {
        path: "listTicket/detail",
        element: <TicketDetail />
      },
      {
        path: "products",
        element: <Product />
      },
    ]
  },
  {
    path: '/admin/login',
    element: <LoginPage />
  }
];

export default AdminRoutes;
