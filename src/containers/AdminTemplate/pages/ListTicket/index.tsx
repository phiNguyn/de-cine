
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/Layout/layout";
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import { UserNav } from "../../components/user-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/containers/AdminTemplate/components/table/data-table";
import { columns } from "./columns";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import BookingAPI from "@/apis/booking";
import { useBooking } from "@/store/Booking";
export default function ListTickets() {
  const { Booking, setBooking } = useBooking((state) => state)
  const { data } = useQuery({
    queryKey: ['Bookings'],
    queryFn: () => BookingAPI.getAll(),
    staleTime: 60 * 1000
  })
  useEffect(() => {
    if (data) {
      setBooking(data)
    }
  }, [data, setBooking])
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Layout.Header>
          <div className='ml-auto flex items-center space-x-4'>
            <Dropdown className='!mt-0 px-2 cursor-pointer' />
            <UserNav />
          </div>
        </Layout.Header>
        <Layout.Body>
          <Tabs
            orientation='vertical'
            defaultValue='overview'
            className='space-y-4'
          >
            <div className='w-full flex justify-between overflow-x-auto pb-2'>
              <TabsList>
                <TabsTrigger value='overview'>Danh Sách</TabsTrigger>
                <TabsTrigger value='analytics'>Biểu Đồ</TabsTrigger>
                <TabsTrigger value='reports'>Reports</TabsTrigger>
                <TabsTrigger value='add'>Thêm phim mới</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value='overview' className='space-y-4'>
            </TabsContent>

          </Tabs>
          <div className="w-full p-8 ">
            <DataTable name="mã vé" value="booking_code" columns={columns} data={Booking} />
          </div>

        </Layout.Body>
      </Layout>
    </ThemeProvider>
  );
}
