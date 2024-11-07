import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoomStore } from "@/store/Room";
import RoomAPI from "@/apis/room";
import { useQuery } from "@tanstack/react-query";
import { useMovieStore } from "@/store/Movie";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import moviesAPI from "@/apis/movie";
import ShowtimeAPI from "@/apis/showtime";
import { ShowTimeSlot } from "@/types/showtime";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import moment from "moment-timezone";
const formSchema = z.object({
    id_room: z.string(),
    id_movie: z.string(),
    date_time: z.union([z.date(), z.literal("")], {
        message: "Đây là trường bắt buộc",
    }),
    slots: z.array(z.number()).min(1, { message: "Phải chọn ít nhất 1 khung giờ" }),
})
export type ShowTimeFormValues = z.infer<typeof formSchema>;

export default function AddShowTime() {
    const [open, setOpen] = useState(false);
    const { movie, setMovie } = useMovieStore((state) => state)
    const { Room, setRoom } = useRoomStore((state) => state)
    const [showtimeSlotData, setShowtimeSlot] = useState<ShowTimeSlot[]>([])
    const { data } = useQuery({
        queryKey: ['room'],
        queryFn: RoomAPI.getAllRoom,
        staleTime: 60 * 1000,

    })

    useEffect(() => {
        if (data) {
            setRoom(data)
        }
    }, [data])

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const resp = await moviesAPI.getAllMovie()
                const showtimeSlot = await ShowtimeAPI.getShowtimeSlot()

                setMovie(resp)
                setShowtimeSlot(showtimeSlot)
            } catch (error) {
                console.log(error);

            }
        }
        fetchMovie()
    }, [])
    const form = useForm<ShowTimeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date_time: new Date(),
            slots: []
        }
    });

    async function dataSubmit(data: ShowTimeFormValues) {
        const { date_time, id_room, id_movie } = data
        const updateData = {
            ...data,
            date_time: moment.tz(date_time, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
            id_room: Number(id_room),
            id_movie: Number(id_movie),
            start_time: moment.tz(date_time, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
        }

        console.log(updateData);
        try {
            const resp = await ShowtimeAPI.addShowtime(updateData)
            if (resp?.status == 201) {
                toast.success("ShowTime add successfully")
                form.reset()
                setOpen(false)

            }


        } catch (error) {
            console.log(error);

        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Thêm suất chiếu</Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Thêm Tài Khoản</DialogTitle>
                    <DialogDescription>
                        Thêm tài khoản người dùng mới
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(dataSubmit)} className='space-y-8'>
                        <div className="grid grid-cols-1 gap-y-5">

                            <FormField
                                control={form.control}
                                name='id_room'
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-1">
                                        <div className="flex items-center gap-x-5">


                                            <FormLabel className="w-[150px]">Chọn phòng chiếu</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder='Chọn phòng' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Phòng chiếu</SelectLabel>

                                                        {Room.map(room => (
                                                            <SelectItem key={room.id_room} value={String(room.id_room)}>{room.room_name}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='id_movie'
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-1">
                                        <div className="flex items-center gap-x-5">


                                            <FormLabel className="w-[150px]">Chọn phim</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder='Chọn phim' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Phòng chiếu</SelectLabel>
                                                        {movie.map(movie => (
                                                            <SelectItem key={movie.id_movie} value={String(movie.id_movie)}>{movie.movie_name}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="slots"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Chọn xuất chiếu</FormLabel>
                                        <FormDescription>
                                            Chọn các giờ chiếu
                                        </FormDescription>
                                    </div>
                                    <div className="flex items-center gap-x-2">

                                        {showtimeSlotData.map((item) => (
                                            <FormField
                                                key={item.id_slot}
                                                control={form.control}
                                                name="slots"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={item.id_slot}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id_slot)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item.id_slot])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value) => value !== item.id_slot
                                                                                )
                                                                            )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal">
                                                                {moment.tz(item.slot_time, "HH:mm:ss", 'Asia/Ho_Chi_Minh').format('HH:mm')}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date_time"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Ngày chiếu phim</FormLabel>
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
                        <div className="w-full flex justify-between items-center">
                            <Button className="" type='submit'>Thêm phòng</Button>
                            <Button variant={"outline"} type='button'
                                onClick={() => form.reset}
                            >Reset</Button>

                        </div>
                    </form>
                </Form>
            </DialogContent>
            <Toaster />
        </Dialog>
    );
};

