
import { ThemeProvider } from "@/components/theme-provider";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout/layout";
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import { UserNav } from "@/containers/AdminTemplate/components/user-nav";
import { DatePickerWithRange } from "../../components/data-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../../components/table/data-table";
import { useEffect } from "react";
import Loader from "@/components/loader";
import { columns } from "./columns";
import productAPI from "@/apis/product";
import AddProduct from "./AddProduct";
import { useProductStore } from "@/store/Products";


export default function ListMovies() {
    const { Product, setProduct } = useProductStore((state) => state)
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: productAPI.getProducts,
        staleTime: 60 * 1000
    })
    useEffect(() => {
        if (data) {
            setProduct(data)
        }
    }, [data, setProduct])
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
                    <div className='mb-2 flex items-center justify-between space-y-2'>
                        <h1 className='text-2xl font-bold tracking-tight'>Phim</h1>
                        <div className='flex w-fit items-center space-x-5'>
                            <DatePickerWithRange />
                            {/* <Button>Download</Button> */}
                        </div>
                    </div>
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
                            </TabsList>
                            <AddProduct />
                        </div>
                        <TabsContent value='overview' className='space-y-4'>
                            {
                                isLoading ? <Loader /> :

                                    <div className="container mx-auto ">
                                        <DataTable name="tên phim" value="product_name" columns={columns} data={Product} />
                                    </div>
                            }
                        </TabsContent>
                        {/* <TabsContent value='add' className='space-y-4'>
              <div className="container mx-auto ">
                 <AddMoviePage/>
              </div>
            </TabsContent> */}
                    </Tabs>
                </Layout.Body>
            </Layout>
        </ThemeProvider>
    );
}
