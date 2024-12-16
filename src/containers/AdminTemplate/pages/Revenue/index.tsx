import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/Layout/layout";
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import { UserNav } from "../../components/user-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartComponent } from "./component/charts";
import { useRevenueStore } from "@/store/Revenue";
import { useQuery } from "@tanstack/react-query";
import RevenueAPI from "@/apis/revenue";
import Loader from "@/components/loader";
import { FilterComponent } from "./component/RevenueFilter";
export default function Revenue() {
    const { filters, setFilters } = useRevenueStore((state) => state)
    const { data, isLoading } = useQuery({
        queryKey: ['Revenue', filters],
        queryFn: () => RevenueAPI.getRevenue(filters),
        staleTime: 5 * 60 * 1000,
        enabled: !!filters, // Chỉ gọi khi filters không null/undefined
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSetfilters = (newFilters: any) => {
        setFilters({
            ...filters,
            ...newFilters,
        });
    }


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
                                <TabsTrigger value='overview'>Doanh thu</TabsTrigger>
                            </TabsList>

                        </div>
                        <FilterComponent onApplyFilters={handleSetfilters} />
                        <TabsContent value='overview' className='space-y-4'>
                            {isLoading ? (
                                <Loader />
                            ) : !data || data.length === 0 ? (
                                <div className="text-center text-gray-500">
                                    Không có doanh thu trong khoảng thời gian này.
                                </div>
                            ) : (
                                <ChartComponent
                                    data={data}
                                    isYearly={filters?.month ? false : true}
                                    year={filters?.year}
                                />
                            )}
                        </TabsContent>
                    </Tabs>
                </Layout.Body>
            </Layout>
        </ThemeProvider>
    )
}