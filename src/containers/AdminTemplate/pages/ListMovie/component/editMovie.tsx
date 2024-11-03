import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select as SelectOne, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
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
import { useMovieStore } from "@/store/Movie";
import { useParams } from "react-router-dom";
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
    poster_url: z.string().optional(),
    youtube_url: z.string().min(1, { message: "Đây là trường bắt buộc" }),
    image_main: z.string().optional(),
    genres: z.array(z.number()).min(1, { message: "Phải chọn ít nhất 1 thể loại phim" }),
    status: z.string(),
});

export type MovieFormValues = z.infer<typeof movieFormSchema>;
// const = userGenremo
export interface EditMovieProp {
    onSubmit: (data: MovieFormValues) => void
}
export default function EditMovie({ onSubmit }: EditMovieProp) {
    const {id} = useParams()
    const {getMovieById} = useMovieStore((state) => state)
    const movie = getMovieById(Number(id))
    const { genreMovie, setGenreMovie } = useGenreMovieStore()
    const [selectdOptions, setSelectedOptions] = useState([])
    
    const { data } = useQuery({
      queryKey: ['genreMovie'],
      queryFn: moviesAPI.getAllGenreMovies,
      staleTime: 30 * 1000,
    });
   
  
    const form = useForm<MovieFormValues>({
        resolver: zodResolver(movieFormSchema),
        defaultValues: {
            movie_name: movie?.movie_name || "",
            description: movie?.description || "",
            duration: movie?.duration || 12,
            release_date: moment(movie?.release_date).toDate(),
            country: movie?.country || "",
            producer: movie?.producer,
            director: movie?.director,
            cast: movie?.cast,
            poster_url: movie?.poster_url || "",
            youtube_url: movie?.youtube_url,
            image_main: movie?.image_main,
            genres: movie?.genres.map(i=> i.id_genre),
            status: movie?.status || "",
        },
    });
// Thiết lập các tùy chọn khi dữ liệu được lấy về
useEffect(() => {
    if (data) {
        const formattedData = data.map((genre: { genre_name: string, id_genre: number }) => ({
            label: genre.genre_name,
            value: genre.id_genre,
        }));
        setGenreMovie(formattedData);
    }
}, [data]);

useEffect(() => {
    if (movie && genreMovie.length) {
        const defaultOptions = genreMovie.filter((genre) =>
            movie.genres.some((g: { id_genre: number }) => g.id_genre === genre.value)
        );
        setSelectedOptions(defaultOptions);
        form.setValue("genres", defaultOptions.map(option => option.value));
    }
}, [movie, genreMovie]);
  const handleChange = (options) => {
    setSelectedOptions(options);
   form.setValue("genres", options.map((option) => option.value));
  };

    async function dataSubmit(data: MovieFormValues) {
        const { release_date } = data
        console.log(data);
        
        const updateReleaseDate = {
            ...data,
            id_movie : movie?.id_movie,
            release_date: moment.tz(release_date, 'Asia/Ho_Chi_Minh').format("YYYY-MM-DD"),
            
        }
        try {
            
            onSubmit(updateReleaseDate)
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
                                <div className="grid grid-cols-1 items-center gap-x-5 lg:grid-cols-2 mb-5">

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
                                                                    format(field.value, "PPP")
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
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
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
                                <div className="grid grid-cols-1 items-center gap-x-5 lg:grid-cols-2  mb-5">

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
                                <div className=" mb-5">
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
                                </div>

                                    <Controller
                                        control={form.control}
                                        name="genres"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Chọn thể loại phim</FormLabel>

                                                <Select 
                                                    className="text-primary-foreground w-full bg-primary-foreground"
                                                    defaultValue={[field.value]}
                                                    options={genreMovie}
                                                    value={selectdOptions}
                                                    onChange={handleChange}
                                                    isMulti={true}
                                                />
                                                <FormMessage />

                                            </FormItem>
                                        )}

                                    />


                                <div className="grid grid-cols-1 items-center gap-x-5 lg:grid-cols-2  mb-5">
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Danh mục</FormLabel>
                                                <SelectOne onValueChange={field.onChange}  defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Danh mục" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectGroup>
                                <SelectLabel>Danh Mục</SelectLabel>
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
                                <Button type="submit">Cập nhật phim</Button>
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="image_main"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ảnh chính</FormLabel>
                                            <FormControl>
                                                <Input placeholder="..." {...field} />
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
                                                <FormLabel>Tên phim</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nhập tên phim" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                            </div>
                        </div>
                    </form>
                </Form>


            </ThemeProvider>

        </>
    );
};
