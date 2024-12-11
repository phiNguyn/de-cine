import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/Layout/layout";
import { useCommentStore } from "@/store/Comment";
import { useQuery } from "@tanstack/react-query";
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import { UserNav } from "../../components/user-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../../components/table/data-table";
import { columns } from "./columns";
import { commentAPI } from "@/apis/comment";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "../../components/data-picker";
import moment from "moment-timezone";
import MovieFillter from "./component/MovieFilter";
import StartFilter from "./component/StartFilter";

// Dữ liệu bình luận
export default function ListComment() {
  const { filters, setFilters } = useCommentStore((state) => state)

  const { data } = useQuery({
    queryKey: ["commentsfilters", filters],
    queryFn: () => commentAPI.getAllComments(filters),
    staleTime: 60 * 1000,

  });

  const handleSetFilter = (dateRange: DateRange | undefined) => {
    if (dateRange && dateRange.from && dateRange.to) {
      setFilters({
        ...filters,
        from: moment(dateRange.from).format('YYYY-MM-DD'),
        to: moment(dateRange.to).add(1, 'days').format('YYYY-MM-DD'),

      })
    }
  }
const handleMovieFillter = (id_movie?:number | string) => { 
  setFilters({...filters, id_movie})
}
const handleStartFillter = (rating?:number | string) => {
  setFilters({...filters, rating})
}

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
          <div className="flex justify-between">

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
          <DatePickerWithRange onApply={handleSetFilter} />
            </div>

          <div className="w-full">
              <div className=" gap-x-5 flex">
            <MovieFillter  onFilterChange={handleMovieFillter}/> 
            <StartFilter onFilterChange={handleStartFillter} />

              </div>
            
            <DataTable
              name="Nội dung bình luận"
              value="content"
              columns={columns}
              data={data || []}
            />
          </div>
        </Layout.Body>
      </Layout>
    </ThemeProvider>
  );
}
