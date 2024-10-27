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
import { Input } from "@/components/ui/input"

// Định nghĩa schema cho form
const formSchema = z.object({
  roomName: z.string().min(2, { message: "Tên phòng phải có ít nhất 2 ký tự." }),
  roomType: z.string().min(2, { message: "Loại phòng phải có ít nhất 2 ký tự." }),
  seats: z.number().min(1, { message: "Số chỗ ngồi phải lớn hơn 0." }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export function RoomForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomName: "",
      roomType: "",
      seats: "",
      createdAt: "",
      updatedAt: "",
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data)
    // Xử lý khi submit
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="roomName"
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
            name="roomType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại phòng</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập loại phòng" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="seats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số chỗ ngồi</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Nhập số chỗ ngồi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày tạo</FormLabel>
                <FormControl>
                  <Input type="date" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="updatedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày cập nhật</FormLabel>
                <FormControl>
                  <Input type="date" {...field} disabled />
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
  )
}
