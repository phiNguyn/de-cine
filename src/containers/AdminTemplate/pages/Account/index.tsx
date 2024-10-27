import { Layout } from '@/components/Layout/layout'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TopNav } from '@/containers/AdminTemplate/components/top-nav'
import { UserNav } from '@/containers/AdminTemplate/components/user-nav'
import { Dropdown } from '@/components/Auth'
import { ThemeProvider } from '@/components/theme-provider'
import { DataTable } from './data-table'
import { columns } from './colums'
import { DatePickerWithRange } from '../../components/data-picker'
import { User } from '@/types/user'
import { useUserStore } from '@/store/Users'
import { useEffect } from 'react'
import { UserAPI } from '@/apis/user'

export default function Users() {
  // const {user, setUsers} = useUserStore((state) => state)

  // useEffect(() => {
  //   const fetchUsers = async() => {
  //     try {
  //       const resp = await UserAPI.getAllUsers()
  //       setUsers(resp)
  //     } catch (error) {
  //       console.log(error);
        
  //     }
  //   }
  //   fetchUsers()
  // },[setUsers])
  const user: User[] = [
    {
      id: '66bf3146c22c80a933211f6c',
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    },
    {
      id: 2,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 3,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 4,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 5,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 6,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 7,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 8,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 9,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 10,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    },
    {
      id: 11,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 12,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 13,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 14,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 15,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 16,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    }, {
      id: 17,
      name: "Nguyen",
      email: "phinguyenq12@gmail.com",
      phone: '8477***3622',
      role: 'admin'
    },
  ]
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
            <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
            <div className='flex w-fit items-center space-x-5'>
              <DatePickerWithRange className='w-fit' />      <Button>Download</Button>
            </div>
          </div>
          <Tabs
            orientation='vertical'
            defaultValue='overview'
            className='space-y-4'
          >
            <div className='w-full overflow-x-auto pb-2'>
              <TabsList>
                <TabsTrigger value='overview'>Danh Sách</TabsTrigger>
                <TabsTrigger value='analytics'>Biểu Đồ</TabsTrigger>
                <TabsTrigger value='reports'>Reports</TabsTrigger>
                <TabsTrigger value='notifications'>Notifications</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value='overview' className='space-y-4'>
              <div className="container mx-auto ">
                <DataTable columns={columns} data={user} />
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
