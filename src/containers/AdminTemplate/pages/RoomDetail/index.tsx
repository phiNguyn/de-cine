import { Layout } from '@/components/Layout/layout'
import { UserNav } from '@/containers/AdminTemplate/components/user-nav'
import { Dropdown } from '@/containers/ClientTemplate/component/Auth'
import { ThemeProvider } from '@/components/theme-provider'
import { RoomForm } from './RoomForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomChair } from './RoomChair'
const RoomDetail = () => {
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
        <Tabs
            orientation='vertical'
            defaultValue='overview'
            className='space-y-4'
          >
            <div className='w-full flex justify-between overflow-x-auto pb-2'>
              <TabsList>
                <TabsTrigger value='overview'>Chi tiết</TabsTrigger>
                
              </TabsList>
            </div>
            <TabsContent value='overview' className='space-y-4'>
              <div className="container mx-auto ">
             <RoomChair />

              </div>
            </TabsContent>
            <TabsContent value='overview' className='space-y-4'>
              <div className="container mx-auto ">

              </div>
            </TabsContent>
            <TabsContent value='edit' className='space-y-4'>
              <div className="container mx-auto ">
          <RoomForm />

              </div>
            </TabsContent>
          </Tabs>
        </Layout.Body>
      </Layout>
    </ThemeProvider>
  )
}


export default RoomDetail
