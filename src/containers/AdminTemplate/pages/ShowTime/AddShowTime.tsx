import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoomStore } from "@/store/Room";
import RoomAPI from "@/apis/room";
import { useQuery } from "@tanstack/react-query";
// import { useMovieStore } from "@/store/Movie";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import moviesAPI from "@/apis/movie";
import ShowtimeAPI from "@/apis/showtime";
import { ShowTimeSlot } from "@/types/showtime";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment-timezone";
import { Label } from "@/components/ui/label";
import { Movie } from "@/types/movie";
const removePointerEvents = "!pointer-events-auto"

const formSchema = z.object({
    id_room: z.string(),
    id_movie: z.string(),
    date_time: z.date({ message: "Vui lòng chọn ngày" }),
    id_slots: z.array(z.number()).min(1, { message: "Phải chọn ít nhất 1 khung giờ" }),
})
export type ShowTimeFormValues = z.infer<typeof formSchema>;

export default function AddShowTime() {
    const [open, setOpen] = useState(false);
    const [movie, setMovie] = useState<Movie[] | []>([])
    const { Room, setRoom } = useRoomStore((state) => state)
    const [showtimeSlotData, setShowtimeSlot] = useState<ShowTimeSlot[]>([])
    const [disableShowtimeSlot, setDisableShowtimeSlot] = useState<number[]>([]);

    const { data } = useQuery({
        queryKey: ['room'],
        queryFn: RoomAPI.getAllRoom,
        staleTime: 60 * 1000,

    })
    const { data: dataMovie } = useQuery({
        queryKey: ['MovieActive'],
        queryFn: () => moviesAPI.getAllMovieActive("active"),
        staleTime: 60 * 1000
    })

    const { data: dataShowtimeSlot } = useQuery({
        queryKey: ['showtimeSlot'],
        queryFn: ShowtimeAPI.getShowtimeSlot,
        staleTime: 60 * 1000
    })

    useEffect(() => {
        if (data) {
            setRoom(data)
        }
    }, [data, setRoom])

    useEffect(() => {
        if (dataMovie) {
            setMovie(dataMovie)
        }
    }, [dataMovie, setMovie])

    useEffect(() => {
        if (dataShowtimeSlot) {
            setShowtimeSlot(dataShowtimeSlot)
        }
    }, [dataShowtimeSlot, setShowtimeSlot])

    const form = useForm<ShowTimeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date_time: new Date(),
            id_slots: []
        }
    });

    const handleChangeRoomAndDate = async (id_room: string, date_time: Date | string) => {
        form.setValue("id_room", id_room); // Set movie value in the form
        if (id_room && date_time) {

            try {
                const slots = await await ShowtimeAPI.getShowTimeSlotByRoomAndDate(Number(id_room), moment.tz(date_time, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD'));
                const disabled = slots.map((slot: ShowTimeSlot) => slot.id_slot);
                setDisableShowtimeSlot(disabled); // Update disabled dates
            } catch (error) {
                console.error("Error fetching showtimes:", error);
            }
        }
    }
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
                    <DialogTitle>Suất chiếu</DialogTitle>
                    <DialogDescription>
                        {/* Make changes to your profile here. Click save when you're done. */}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(dataSubmit)} className='space-y-8'>
                        <div className="grid grid-cols-1 gap-y-5">
                            <FormField
                                control={form.control}
                                name='id_movie'
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-1">
                                        <div className="flex items-center gap-x-5">


                                            <FormLabel className="w-[150px]">Chọn phim</FormLabel>
                                            <Select onValueChange={(value) => {
                                                field.onChange(value);
                                            }}>
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
                            <FormField
                                control={form.control}
                                name='id_room'
                                render={() => (
                                    <FormItem className="grid grid-cols-1">
                                        <div className="flex items-center gap-x-5">


                                            <FormLabel className="w-[150px]">Chọn phòng chiếu</FormLabel>
                                            <Select
                                                onValueChange={(value) => {
                                                    form.setValue("id_room", value); // Cập nhật giá trị phòng vào form
                                                    handleChangeRoomAndDate(value, form.getValues("date_time")); // Gọi hàm với giá trị phòng và ngày hiện tại
                                                }}

                                            >
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

                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date_time" className="text-center">
                                Ngày chiếu
                            </Label>
                            <Controller
                                control={form.control}
                                name="date_time"
                                render={({ field }) => (
                                    <FormItem>


                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="date_time"
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] justify-start text-left font-normal col-span-3",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? (
                                                        moment.tz(field.value, 'Asia/Ho_Chi_Minh').format("DD-MM-YYYY")

                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className={`w-auto p-0 ${removePointerEvents}`} align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            field.onChange(date); // Cập nhật ngày vào form
                                                            handleChangeRoomAndDate(form.getValues("id_room"), date); // Gọi hàm với phòng và ngày hiện tại
                                                        }
                                                    }}
                                                    disabled={(date) =>
                                                        date < new Date()
                                                    }
                                                    initialFocus
                                                    className={removePointerEvents}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="id_slots"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Chọn xuất chiếu</FormLabel>
                                        <FormDescription>
                                            Chọn các giờ chiếu
                                        </FormDescription>
                                    </div>
                                    { }
                                    <div className="flex flex-wrap gap-2">
                                        {showtimeSlotData.map((item) => (
                                            <div
                                                key={item.id_slot}
                                                className="flex items-start space-x-3 w-1/7"
                                            >
                                                <FormField
                                                    key={item.id_slot}
                                                    control={form.control}
                                                    name="id_slots"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    name={String(item.id_slot)}
                                                                    disabled={disableShowtimeSlot.includes(item.id_slot)} // Disable nếu slot bị disable
                                                                    checked={field.value?.includes(item.id_slot)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item.id_slot])
                                                                            : field.onChange(
                                                                                field.value?.filter((value) => value !== item.id_slot)
                                                                            );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal">
                                                                {moment
                                                                    .tz(item.slot_time, "HH:mm:ss", 'Asia/Ho_Chi_Minh')
                                                                    .format('HH:mm')}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
            <Toaster />
        </Dialog>
    );
};

