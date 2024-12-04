import { useRoutes } from "react-router-dom";
import { Suspense } from "react";

import ClientRoutes from "./ClientRoutes";
import AdminRoutes from "./AdminRoutes";
import Loader from "@/components/loader";

const ThemeRoutes = () => {

  return (
    <Suspense fallback={<Loader/>}>
      {useRoutes([...ClientRoutes,...AdminRoutes])} {/* Sử dụng toán tử spread */}
    </Suspense>
  );
};

export default ThemeRoutes;
