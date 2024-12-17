import { Layout } from '@/components/Layout/layout'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserNav } from '@/containers/AdminTemplate/components/user-nav'
import { Dropdown } from '@/containers/ClientTemplate/component/Auth'
import { ThemeProvider } from '@/components/theme-provider'
import { Overview } from '../components/overview'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import RevenueAPI from '@/apis/revenue'

export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ticketSale, setTicketSale] = useState<any>()
  const { data: dataTicketSale } = useQuery({
    queryKey: ['ticketSale'],
    queryFn: RevenueAPI.getRevenueAll,
    staleTime: 5 * 60 * 1000
  })

  useEffect(() => {
    if (dataTicketSale) {
      setTicketSale(dataTicketSale)

    }
  }, [dataTicketSale, setTicketSale])
  console.log(ticketSale);



  return (


    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        {/* ===== Top Heading ===== */}
        <Layout.Header>
          {/* <TopNav links={topNav} /> */}
          <div className='ml-auto flex items-center space-x-4'>
            <Dropdown className='!mt-0 px-2 cursor-pointer' />
            <UserNav />
          </div>
        </Layout.Header>

        {/* ===== Main ===== */}
        <Layout.Body>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          </div>
          <Tabs
            orientation='vertical'
            defaultValue='overview'
            className='space-y-4'
          >
            <div className='w-full overflow-x-auto pb-2'>
              <TabsList>
                <TabsTrigger value='overview'>Tổng quan</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value='overview' className='space-y-4'>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Doanh thu
                    </CardTitle>

                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{Number(ticketSale?.total_revenue).toLocaleString()} đ</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Vé bán</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <rect width='20' height='14' x='2' y='5' rx='2' />
                      <path d='M2 10h20' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{ticketSale?.total_bookings}</div>

                  </CardContent>
                </Card>
              </div>
              <div className='grid grid-cols-1 gap-4 '>
                <Card className='col-span-1 lg:col-span-4'>
                  <CardHeader>
                    <CardTitle hidden>Biểu đồ</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-2'>
                    <Overview />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </Layout.Body>
      </Layout>
    </ThemeProvider>
  )
}

