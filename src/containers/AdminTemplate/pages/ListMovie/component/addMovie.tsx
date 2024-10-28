import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const movieFormSchema = z.object({
    movie_name: z.string().min(1, { message: "Tên phim không được để trống" }),
    price: z.number().nonnegative({ message: "Giá phải là số không âm" }),
    description: z.string().optional(),
    duration: z.number().positive({ message: "Thời lượng phải là số dương" }),
    release_date: z.string(),
    country: z.string().min(1, { message: "Quốc gia không được để trống" }),
    producer: z.string().min(1, { message: "Nhà sản xuất không được để trống" }),
    director: z.string().min(1, { message: "Đạo diễn không được để trống" }),
    cast: z.string().min(1, { message: "Diễn viên không được để trống" }),
    poster_url: z.string().optional(),
    id_genre: z.number().int(),
    youtube_url: z.string().optional(),
    image_main: z.string().optional(),
});

export type MovieFormValues = z.infer<typeof movieFormSchema>;
    // const = userGenremo
const AddMovie = () => {
    const [open, setOpen] = useState(false);
    const form = useForm<MovieFormValues>({
        resolver: zodResolver(movieFormSchema),
        defaultValues: {
            movie_name: '',
            price: 0,
            description: '',
            duration: 120,
            release_date: '',
            country: '',
            producer: '',
            director: '',
            cast: '',
            poster_url: '',
            id_genre: 0,
            youtube_url: '',
            image_main: ''
        },
    });

    async function dataSubmit(data: MovieFormValues) {
        try {
            console.log(data);
            // const resp = await MovieAPI.addMovie(data);
            // if (resp?.status == 201) {
            //     toast.success("Đã thêm phim mới");
            // }
            setOpen(false);
        } catch (error) {
            console.log(error);
            toast.error("Lỗi khi thêm phim");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Thêm mới phim</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-[1000px]">
                <DialogHeader>
                    <DialogTitle>Thêm mới phim</DialogTitle>
                    <DialogDescription>Nhập thông tin chi tiết cho phim mới</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(dataSubmit)} className="space-y-8">
                        <div className="flex">

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
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Giá</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Nhập giá" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            </div>
                        <FormField
                            control={form.control}
                            name="release_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ngày phát hành</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
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
                            name="id_genre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thể loại</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Chọn thể loại" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Thể loại</SelectLabel>
                                                <SelectItem value={1}>Hành động</SelectItem>
                                                <SelectItem value={2}>Phiêu lưu</SelectItem>
                                                {/* Thêm các thể loại khác */}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Thêm phim</Button>
                    </form>
                </Form>
            </DialogContent>
            <Toaster />
        </Dialog>
    );
};

export default AddMovie;
