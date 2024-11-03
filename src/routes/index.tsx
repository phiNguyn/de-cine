import { useRoutes } from "react-router-dom";
import { Suspense } from "react";

import ClientRoutes from "./ClientRoutes";
import AdminRoutes from "./AdminRoutes";
import { Loading } from "@/containers/ClientTemplate";

const ThemeRoutes = () => {

  return (
    <Suspense fallback={<Loading/>}>
      {useRoutes([...ClientRoutes,...AdminRoutes])} {/* Sử dụng toán tử spread */}
    </Suspense>
  );
};

export default ThemeRoutes;
