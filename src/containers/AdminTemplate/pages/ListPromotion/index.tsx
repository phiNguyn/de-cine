import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/Layout/layout";
import { useQuery } from "@tanstack/react-query";
import PromotionAPI from "@/apis/promotion";
import { useEffect } from "react";
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import { UserNav } from "../../components/user-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../../components/table/data-table";
import { usePromotionStore } from "@/store/Promotion";
import { columns } from "../ListPromotion/columns";
import AddPromotion from "./addPromotion";

// Dữ liệu khuyến mãi

export default function ListPromotions() {
  const { promotions, setPromotions } = usePromotionStore((state) => state);
  const { data } = useQuery({
    queryKey: ["promotion"],
    queryFn: PromotionAPI.getAllPromotion, 
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setPromotions(data);
    }
  }, [data]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Layout.Header>
          <div className="ml-auto flex items-center space-x-4">
            <Dropdown className="!mt-0 px-2 cursor-pointer" />
            <UserNav />
          </div>
        </Layout.Header>
        <Layout.Body>
          <Tabs orientation="vertical" defaultValue="overview" className="space-y-4">
            <div className="w-full flex justify-between overflow-x-auto pb-2">
              <TabsList>
                <TabsTrigger value="overview">Danh Sách</TabsTrigger>
                <TabsTrigger value="analytics">Biểu Đồ</TabsTrigger>
                <TabsTrigger value="reports">Báo Cáo</TabsTrigger>
                <TabsTrigger value="add">Thêm Khuyến Mãi</TabsTrigger>
              </TabsList>
              <AddPromotion />
            </div>
            <TabsContent value="overview" className="space-y-4"></TabsContent>
          </Tabs>
          <div className="w-full p-8">
            <DataTable
              name="Tên khuyến mãi"
              value="promotion_name"
              columns={columns}
              data={promotions}
            />
          </div>
        </Layout.Body>
      </Layout>
    </ThemeProvider>
  );
}
