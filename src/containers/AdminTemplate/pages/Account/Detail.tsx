import { Layout } from "@/components/Layout/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { UserNav } from "../../components/user-nav";
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import AccountUpdate, { ProfileFormValues } from "./component/AccountUpdate";
import { useUser } from "@/store/Users";
import { UserAPI } from "@/apis/user";
import toast, { Toaster } from "react-hot-toast";


const AccountDetailPage = () => {
  const update = useUser((state) => state.updateUser)

  const handleUpdate = async (data: ProfileFormValues) => {
    try {
      const resp = await UserAPI.updateUser(data.id_account, data)
      if (resp?.status == 200) {

        update(resp.data)
        console.log(resp.data);

        toast.success("Đã cập nhật tài khoản")
      }
    } catch (error) {
      console.log(error);

    }

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
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>Chi tiết tài khoản</h1>
          </div>
          <AccountUpdate onSubmit={handleUpdate} />
          <Toaster />
        </Layout.Body>
      </Layout>
    </ThemeProvider>
  );
};

export default AccountDetailPage;
