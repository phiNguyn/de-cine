
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/Layout/layout";
import { useRoomStore } from "@/store/Room";
import { useQuery } from "@tanstack/react-query";
import RoomAPI from "@/apis/room";
import { useEffect } from 'react';
import { columns } from './columns';
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import { UserNav } from "../../components/user-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddRoom from "../RoomDetail/AddRoom";
import { DataTable } from "../../components/table/data-table";



// Dữ liệu phòng

export default function ListRooms() {
  const { Room, setRoom } = useRoomStore((state) => state)
  const { data } = useQuery({
    queryKey: ['room'],
    queryFn: RoomAPI.getAllRoom,
    staleTime: 60 * 1000,

  })

  useEffect(() => {
    if (data) {
      setRoom(data)
    }
  }, [data])
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
              <AddRoom />
            </div>
            <TabsContent value='overview' className='space-y-4'>
            </TabsContent>

          </Tabs>
          <div className="w-full p-8 ">
            <DataTable name="tên phòng" value="room_name" columns={columns} data={Room} />
          </div>

        </Layout.Body>
      </Layout>
    </ThemeProvider>
  );
}
