import toast, { Toaster } from "react-hot-toast";
import moviesAPI from "@/apis/movie";
import { Layout } from "@/components/Layout/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { UserNav } from "../../components/user-nav";
import AddMovie from "./component/addMovie";
import { Dropdown } from "@/containers/ClientTemplate/component/Auth";
import { useMovieStore } from "@/store/Movie";
// const = userGenremo
const AddMoviePage = () => {
    const { addMovie } = useMovieStore((state) => state)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleAdd = async (data: any) => {
        const formData = new FormData();
        formData.append('movie_name', data.movie_name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('duration', data.duration);
        formData.append('release_date', data.release_date);
        formData.append('country', data.country);
        formData.append('producer', data.producer);
        formData.append('director', data.director);
        formData.append('cast', data.cast);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.genres.forEach((genre: any) => {
            formData.append('genres[]', genre); // Sử dụng 'genres[]' để gửi như một mảng
        });
        formData.append('status', data.status);
        formData.append('youtube_url', data.youtube_url);
        formData.append('image_main', data.image_main[0]);
        formData.append('poster_url', data.poster_url[0]);


        try {
            const resp = await moviesAPI.addMovie(formData)
            if (resp?.status == 201) {

                addMovie(resp.data.movie)
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
                        <AddMovie onSubmit={handleAdd} />
                    </Layout.Body>
                </Layout>
                <Toaster />
            </ThemeProvider>

        </>
    );
};

export default AddMoviePage;
