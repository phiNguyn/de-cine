import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/Layout/layout";
import { useCommentStore } from "@/store/Comment";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import { UserNav } from "../../components/user-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../../components/table/data-table";
import { columns } from "./columns";
import { commentAPI } from "@/apis/comment";

// Dữ liệu bình luận
export default function ListComment() {
const { comments, setComments } = useCommentStore((state) => state)
  const { data } = useQuery({
    queryKey: ["comment"],
    queryFn: commentAPI.getAllComments,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setComments(data);
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
          <Tabs
            orientation="vertical"
            defaultValue="overview"
            className="space-y-4"
          >
            <div className="w-full flex justify-between overflow-x-auto pb-2">
              <TabsList>
                <TabsTrigger value="overview">Danh Sách</TabsTrigger>
                <TabsTrigger value="analytics">Biểu Đồ</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="add">Thêm bình luận mới</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="overview" className="space-y-4"></TabsContent>
          </Tabs>
          <div className="w-full p-8">
            <DataTable
              name="Nội dung bình luận"
              value="comment_content"
              columns={columns}
              data={comments}
            />
          </div>
        </Layout.Body>
      </Layout>
    </ThemeProvider>
  );
}
