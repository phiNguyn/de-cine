// import { ROLE } from "@/constants/role"; 
// import RequireAuth from "@/guards";
import { lazy } from "react";
const AppShell = lazy(() => import("@/containers/AdminTemplate/components/app-shell"));
const DashBoard = lazy(() => import("@/containers/AdminTemplate/pages/DashBoard"));
const LoginPage = lazy(() => import("@/containers/AdminTemplate/pages/auth/Login"));
const UsersPage = lazy (() => import('@/containers/AdminTemplate/pages/Account'))
const ListMovies = lazy(() => import("@/containers/AdminTemplate/pages/ListMovie"));
const ListTickets = lazy(() => import("@/containers/AdminTemplate/pages/ListTicket"));
const ListRooms = lazy(() => import("@/containers/AdminTemplate/pages/ListRoom"));
// Định nghĩa AdminRoutes với kiểu RouteObject
const AdminRoutes = [
  {
    path: 'admin',
    element:    
     <AppShell />

    // // nào làm đăng nhập thì bật cái này lên
    // (
    //   <RequireAuth roles={[ROLE.ADMIN]}>
    //     <AppShell />
    //   </RequireAuth>
    // )
    ,
    children: [
      {
        path: "",
        element: <DashBoard />
      },
      {path : '/admin/users' ,
        element : <UsersPage/>
      },
      {
        path: "/admin/listMovie",
        element: <ListMovies />
      },
      {
        path: "/admin/listTicket",
        element: <ListTickets />
      },
      {
        path: "/admin/listRoom",
        element: <ListRooms />
      }
     
    ]
  },
  {
    path: '/admin/login',
    element: <LoginPage />
  }
];

export default AdminRoutes;
