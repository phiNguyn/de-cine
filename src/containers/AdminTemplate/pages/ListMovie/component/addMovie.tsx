import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select as SelectOne, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { GenreMovie } from "@/types/movie";
import moviesAPI from "@/apis/movie";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Select from "react-select"
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/Layout/layout";
import moment from "moment-timezone";
import { useGenreMovieStore } from "@/store/GenreMove";
import { useQuery } from "@tanstack/react-query";

const movieFormSchema = z.object({
    movie_name: z.string().min(1, { message: "Tên phim không được để trống" }),
    description: z.string().min(1, { message: "Tên phim không được để trống" }),
    duration: z.number().min(1, { message: "Đây là trường bắt buộc" }),
    release_date: z.union([z.date(), z.literal("")], {
        message: "Đây là trường bắt buộc",
    }),
    country: z.string().min(1, { message: "Quốc gia không được để trống" }),
    producer: z.string().min(1, { message: "Nhà sản xuất không được để trống" }),
    director: z.string().min(1, { message: "Đạo diễn không được để trống" }),
    cast: z.string().min(1, { message: "Diễn viên không được để trống" }),
    poster_url: z.any().refine(
        (value) => {
            // Kiểm tra nếu `image_main` trống
            return value && (!Array.isArray(value) || value.length > 0);
        },
        {
            message: 'Hãy chọn file',
            path: ['poster_url'], // Chỉ định trường bị lỗi
        }
    ).nullable(),
    id_genre: z.number().int(),
    youtube_url: z.string().min(1, { message: "Đây là trường bắt buộc" }),
    image_main: z.any().refine(
        (value) => {
            // Kiểm tra nếu `image_main` trống
            return value && (!Array.isArray(value) || value.length > 0);
        },
        {
            message: 'Hãy chọn file',
            path: ['image_main'], // Chỉ định trường bị lỗi
        }
    ).nullable(),
    genres: z.array(z.number()).min(1, { message: "Phải chọn ít nhất 1 thể loại phim" }),
    status: z.string().optional(),
});

export type MovieFormValues = z.infer<typeof movieFormSchema>;
// const = userGenremo
export interface AddMovieProp {
    onSubmit: (data: MovieFormValues) => void,

}
export default function AddMovie({ onSubmit }: AddMovieProp) {
    const [preview, setPreview] = useState<string | null>(null);
    const [previewPoster, setPreviewPoster] = useState<string | null>(null);
    const { genreMovie, setGenreMovie } = useGenreMovieStore()

    const { data } = useQuery({
        queryKey: ['genreMovie'],
        queryFn: moviesAPI.getAllGenreMovies,
        staleTime: 30 * 1000,
    });
    useEffect(() => {
        if (data) {
            const formattedData = data.map((genre: GenreMovie) => ({
                label: genre.genre_name, // Đặt tên của thuộc tính phù hợp
                value: genre.id_genre // Đặt ID hoặc thuộc tính cần làm value
            }));
            setGenreMovie(formattedData)
        }
    }, [data])


    const [selectdOptions, setSelectedOptions] = useState([])
    const handleChange = (options) => {
        setSelectedOptions(options);
        // Cập nhật trường 'genres' với các giá trị number
        form.setValue("genres", options.map(option => option.value));
    };
    const form = useForm<MovieFormValues>({
        resolver: zodResolver(movieFormSchema),
        defaultValues: {
            movie_name: '',
            description: '',
            duration: 120,
            release_date: "",
            country: '',
            producer: '',
            director: '',
            cast: '',
            poster_url: '',
            id_genre: 0,
            youtube_url: '',
            image_main: '',
            genres: [],
            status: "",
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function dataSubmit(data: any) {
        const { release_date } = data
        const updateData = {
            ...data,
            price: 0,
            release_date: moment.tz(release_date, 'Asia/Ho_Chi_Minh').format("YYYY-MM-DD"),
        }
        try {

            onSubmit(updateData)
            // form.reset()
        } catch (error) {
            // Xử lý lỗi (nếu cần)
            console.error("Lỗi khi thêm phim:", error);
        }
    }

    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Layout>

                </Layout>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(dataSubmit)} className="space-y-8">
                        <div className="grid grid-cols-2 gap-x-10">
                            <div >

                                <div className=" mb-5">
                                    <FormField
                                        control={form.control}
                                        name="movie_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tên phim</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nhập tên phim" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex justify-between mb-5">

                                    <FormField
                                        control={form.control}
                                        name="release_date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Ngày ra mắt phim</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[240px] pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    moment.tz(field.value, 'Asia/Ho_Chi_Minh').format("DD-MM-YYYY")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={(date) => {
                                                                if (date) {
                                                                    field.onChange(new Date(date))
                                                                }
                                                            }}

                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Quốc gia</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nhập quốc gia" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex justify-between mb-5">

                                    <FormField
                                        control={form.control}
                                        name="producer"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nhà sản xuất</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nhập nhà sản xuất" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="director"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Đạo diễn</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nhập đạo diễn" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex justify-between mb-5">
                                    <FormField
                                        control={form.control}
                                        name="cast"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Diễn viên</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nhập danh sách diễn viên" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField 
                                        control={form.control}
                                        name="genres"
                                        render={({ field }) => (
                                            <FormItem className="w-[185px]">
                                                <FormLabel>Thể Loại</FormLabel>

                                                <Select
                                                    className="text-background "
                                                    options={genreMovie}
                                                    value={selectdOptions}
                                                    onChange={handleChange}
                                                    isMulti={true}
                                                    
                                                />
                                                <FormMessage />

                                            </FormItem>
                                        )}

                                    />

                                </div>

                                <div className="mb-5 flex justify-between">
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Danh mục</FormLabel>
                                                <SelectOne onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Danh mục" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="active">Đang chiếu</SelectItem>
                                                            <SelectItem value="future">Sắp chiếu</SelectItem>
                                                            <SelectItem value="disable">Ngừng kinh doanh</SelectItem>

                                                        </SelectGroup>
                                                    </SelectContent>
                                                </SelectOne>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="youtube_url"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Đường dẫn trailer</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Thời lượng phim</FormLabel>
                                            <FormControl>
                                                <Input type="number"
                                                    placeholder=""
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="mb-5">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mô tả phim</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit">Thêm phim</Button>
                            </div>
                            <div>
                                <div className="grid grid-cols-2 gap-x-5">
                                    <FormField
                                        control={form.control}
                                        name="image_main"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ảnh chính</FormLabel>
                                                {preview && <img src={preview} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%', height: 'auto' }} />}

                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        placeholder="..."
                                                        onChange={(e) => {
                                                            const file = e.target.files ? e.target.files[0] : null;
                                                            field.onChange(e.target.files);

                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    setPreview(reader.result as string);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            } else {
                                                                setPreview(null);
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="poster_url"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ảnh banner</FormLabel>
                                                {previewPoster && <img src={previewPoster} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%', height: 'auto' }} />}

                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        placeholder="..."
                                                        onChange={(e) => {
                                                            const file = e.target.files ? e.target.files[0] : null;
                                                            field.onChange(e.target.files);

                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    setPreviewPoster(reader.result as string);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            } else {
                                                                setPreviewPoster(null);
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>


            </ThemeProvider>

        </>
    );
};

