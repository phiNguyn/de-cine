import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select as SelectOne, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select";

import { Input } from "@/components/ui/input"
import { useParams } from "react-router-dom"
import { useRoomStore } from "@/store/Room"
import moment from "moment-timezone"
import RoomAPI from "@/apis/room"
import toast, {Toaster} from "react-hot-toast"

// Định nghĩa schema cho form
const formSchema = z.object({
  id_room: z.number(),
  room_name: z.string().min(2, { message: "Tên phòng phải có ít nhất 2 ký tự." }),
  room_status: z.string(),
  room_type: z.string().optional(),
  chair_number: z.number()
    .min(30, { message: "Số ghế ít nhất là 30" })
    .max(120, { message: "Số ghế tối đa là 120" }), // Thêm thông báo cho max
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})
export type RoomFormValues = z.infer<typeof formSchema>;

export function RoomForm() {

  const { id } = useParams()
  const { getRoomById, updateRoom } = useRoomStore((state) => state)
  const roomDetail = getRoomById(Number(id))
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_room: roomDetail?.id_room,
      room_name: roomDetail?.room_name,
      room_status: roomDetail?.room_status,
      room_type: roomDetail?.room_type,
      chair_number: roomDetail?.chair_number || 30,
      created_at: moment.tz(roomDetail?.created_at, 'Asia/Ho_Chi_Minh').format("DD-MM-YYYY HH:mm:ss"),
      updated_at: moment.tz(roomDetail?.updated_at, 'Asia/Ho_Chi_Minh').format("DD-MM-YYYY HH:mm:ss")
    },
  })

  const onSubmit = async (data: RoomFormValues) => {
    console.log(data)
    // Xử lý khi submit
    const { chair_number, id_room, room_name, room_status, room_type } = data
    const updateData = {
      chair_number, id_room, room_name, room_status, room_type
    }
    try {
      const resp = await RoomAPI.updateRoom(data.id_room, updateData)
      if (resp?.status == 200) {
        updateRoom(resp.data)
        toast.success("Đã cập nhật phòng")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="room_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên phòng</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên phòng" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="room_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái phòng</FormLabel>
                <SelectOne onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Danh Mục</SelectLabel>
                      <SelectItem value="active">Đang chiếu</SelectItem>
                      <SelectItem value="maintenance">Bảo trì</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </SelectOne>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="chair_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số chỗ ngồi</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Nhập số chỗ ngồi" {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}

                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="room_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại phòng</FormLabel>
                <SelectOne onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Danh Mục</SelectLabel>
                      <SelectItem value="2D">Phòng 2D</SelectItem>
                      <SelectItem value="3D">Phòng 3D</SelectItem>
                      <SelectItem value="VIP">Phòng VIP</SelectItem>
                      <SelectItem value="normal">Phòng thường</SelectItem>

                    </SelectGroup>
                  </SelectContent>
                </SelectOne>
                <FormMessage />
              </FormItem>
            )}
            />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="created_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày tạo</FormLabel>
                <FormControl>
                  <Input    {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="updated_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày cập nhật</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        <div className="flex justify-end">
          <Button type="submit">Cập nhật</Button>
        </div>
      </form>
    </Form>
    <Toaster/>
            </>
  )
}
