import toast, { Toaster } from "react-hot-toast";
import moviesAPI from "@/apis/movie";
import {Layout} from "@/components/Layout/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { UserNav } from "../../components/user-nav";
import AddMovie from "./component/addMovie";
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import { useMovieStore } from "@/store/Movie";
  // const = userGenremo
const AddMoviePage = () => {
    const {addMovie} = useMovieStore((state) => state)

     const handleAdd = async (data) => {
        try {
            const resp = await moviesAPI.addMovie(data)
            if(resp?.status == 201) {
                addMovie(data)
            toast.success("Đã thêm phim thành công")
            } else {
                toast.error("Không thể thêm phim. Vui lòng kiểm tra lại."); // Thông báo nếu không phải mã 201
            }

        } catch (error) {
            console.log(error);
            toast.error("Có lỗi ở đâu đó")
            
        }
    }
    return (
        <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
        <Layout.Header>
          <div className='ml-auto flex items-center space-x-4'>
          <Dropdown className='!mt-0 px-2 cursor-pointer' />
            <UserNav />
          </div>
        </Layout.Header>
        <Layout.Body>
        <AddMovie onSubmit={handleAdd}/>
        </Layout.Body>
        </Layout>
            <Toaster />
    </ThemeProvider>

            </>
    );
};

export default AddMoviePage;
