import { Layout } from "@/components/Layout/layout"
import { ThemeProvider } from "@/components/theme-provider"
import { User } from "@/types/user"
import { UserNav } from "../../components/user-nav"
import { DatePickerWithRange } from "../../components/data-picker"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dropdown } from "@/components/Auth"

const AccountDetailPage =() => {
  const user : User = {
    email : "phi",
    id :2 ,
    name : "phi",
    phone : "0",
    role : 'admin'
       
}
    // const { id } = useParams<string>()
    // const [user, setUser] = useState<User>()
    // const [error, setError] = useState<string | null>(null)
    // const [loading, setLoading] = useState<boolean>(true)

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         setLoading(true)
    //         try {
    //             const resp = await UserAPI.userDetail(id)
    //             setUser(resp.data)
    //         } catch (error) {
    //             setError("Có lỗi xảy ra khi tải dữ liệu người dùng.")
    //             console.error(error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    //     fetchUser()
    // }, [id])

    // if (loading) return <div>Đang tải...</div>
    // if (error) return <div>{error}</div>

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          {/* ===== Top Heading ===== */}
          <Layout.Header>
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
                    {user?.name}
                </div>
              </TabsContent>
            </Tabs>
          </Layout.Body>
        </Layout>
      </ThemeProvider>
    )
}

export default AccountDetailPage