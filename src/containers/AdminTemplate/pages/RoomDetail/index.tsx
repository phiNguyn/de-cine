import { Layout } from '@/components/Layout/layout'
import { TopNav } from '@/containers/AdminTemplate/components/top-nav'
import { UserNav } from '@/containers/AdminTemplate/components/user-nav'
import { Dropdown } from '@/components/Auth'
import { ThemeProvider } from '@/components/theme-provider'
import { RoomForm } from './RoomForm'





const RoomDetail = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Layout.Header>
          <TopNav links={topNav} />
          <div className="ml-auto flex items-center space-x-4">
            <Dropdown className="!mt-0 px-2 cursor-pointer" />
            <UserNav />
          </div>
        </Layout.Header>
        <h1 className='text-2xl font-bold tracking-tight p-3'>Room Detail </h1>
        <div className="flex flex-col lg:flex-row p-4">
          <RoomForm />
        </div>
      </Layout>
    </ThemeProvider>
  )
}

const topNav = [
  { title: 'Overview', href: 'dashboard/overview', isActive: true },
  { title: 'Customers', href: 'dashboard/customers', isActive: false },
  { title: 'Products', href: 'dashboard/products', isActive: false },
  { title: 'Settings', href: 'dashboard/settings', isActive: false },
]

export default RoomDetail
