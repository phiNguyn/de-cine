import { ROLE } from "@/constants/role";
import RequireAuth from "@/guards";
import { lazy } from "react";
const AppShell = lazy(() => import("@/containers/AdminTemplate/components/app-shell"));
const DashBoard = lazy(() => import("@/containers/AdminTemplate/pages/DashBoard"));
const LoginPage = lazy(() => import("@/containers/AdminTemplate/pages/auth/Login"));

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
      }
    ]
  },
  {
    path: '/admin/login',
    element: <LoginPage />
  }
];

export default AdminRoutes;
