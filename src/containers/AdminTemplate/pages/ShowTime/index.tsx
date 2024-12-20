import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/Layout/layout";
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import { UserNav } from "../../components/user-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddShowTime from "./AddShowTime";
import { useShowTimesStore } from "@/store/Showtime";
import { useQuery } from "@tanstack/react-query";
import ShowtimeAPI from "@/apis/showtime";
import { useEffect } from "react";
import { columns } from './columns';
import { DataTable } from "../../components/table/data-table";
import Loader from "@/components/loader";
export default function ShowTime() {
    const { ShowTimes, setShowTimes } = useShowTimesStore((state) => state)
    const { data, isLoading } = useQuery({
        queryKey: ['showtimes'],
        queryFn: ShowtimeAPI.getAllShowtimes,
        staleTime : 30 * 1000
    })

    useEffect(() => {
        if (data) {
            setShowTimes(data)
        }
    }, [data, setShowTimes])
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
                              
                            </TabsList>

                            <AddShowTime />
                        </div>
                        <TabsContent value='overview' className='space-y-4'>
                            {isLoading ? <Loader /> :
                                <div className="w-full p-8 ">
                                    <DataTable name="suất chiếu" value="date_time" columns={columns} data={ShowTimes} />
                                </div>
                            }
                        </TabsContent>

                    </Tabs>

                </Layout.Body>
            </Layout>
        </ThemeProvider>
    )
}
