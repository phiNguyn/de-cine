import { Layout } from '@/components/Layout/layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TopNav } from '@/containers/AdminTemplate/components/top-nav'
import { UserNav } from '@/containers/AdminTemplate/components/user-nav'
import { Dropdown } from '@/containers/ClientTemplate/component/Auth'
import { ThemeProvider } from '@/components/theme-provider'
import { columns } from './colums'
import { DatePickerWithRange } from '../../components/data-picker'
import { useUser } from '@/store/Users'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { UserAPI } from '@/apis/user'
import AddAccount from './component/AddAcount'
import { DataTable } from '../../components/table/data-table'

export default function Users() {
  const { user, setUser } = useUser((state) => state)

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: UserAPI.getAllUsers,
    staleTime: 1 * 60 * 1000,
  });
  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        {/* ===== Top Heading ===== */}
        <Layout.Header>
          <TopNav links={topNav} />
          <div className='ml-auto flex items-center space-x-4'>
            <Dropdown className='!mt-0 px-2 cursor-pointer' />
            <UserNav />
          </div>
        </Layout.Header>

        {/* ===== Main ===== */}
        <Layout.Body>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>Tài Khoản</h1>
            <div className='flex w-fit items-center space-x-5'>
              <DatePickerWithRange className='w-fit' />
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
                <TabsTrigger value='notifications'>Notifications</TabsTrigger>
              </TabsList>
              <AddAccount />
            </div>
            <TabsContent value='overview' className='space-y-4'>
              <div className="container mx-auto ">
                <DataTable columns={columns} data={user} name='email' value='email' />
              </div>
            </TabsContent>
          </Tabs>
        </Layout.Body>
      </Layout>
    </ThemeProvider>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
  },
]
