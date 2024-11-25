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
import { useRoomStore } from "@/store/Room";
import RoomAPI from "@/apis/room";

const formSchema = z.object({
  room_name: z.string().min(5, { message: "Tên phòng phải có ít nhất 5 ký tự." }),
  room_status: z.string(),
  room_type: z.string(),
  chair_number: z.number()
    .min(30, { message: "Số ghế ít nhất là 30" })
    .max(120, { message: "Số ghế tối đa là 120" }), // Thêm thông báo cho max
  price: z.number()

})
export type AddRoomFormValues = z.infer<typeof formSchema>;

const AddRoom = () => {
  const [open, setOpen] = useState(false);
  const add = useRoomStore((state) => state.addRoom)
  const form = useForm<AddRoomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      room_name: "",
      room_status: "",
      room_type: "",

    },
  });

  async function dataSubmit(data: AddRoomFormValues) {
    console.log(data);


    try {

      const resp = await RoomAPI.addRoom(data)
      if (resp?.status == 201) {
        add(resp.data)
        toast.success("Đã thêm phòng thành công")
        setTimeout(() => {
          form.reset()
          setOpen(false)
        }, 500);
      }


    } catch (error) {
      console.log(error);

    }
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Thêm phòng mới</Button>
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
                name='room_name'
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1">
                    <div className="flex items-center gap-x-5">


                      <FormLabel className="w-[150px]">Tên phòng</FormLabel>
                      <FormControl className="min-w-fit">
                        <Input placeholder='Nhập tên phòng' {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='chair_number'
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1">
                    <div className="flex items-center gap-x-5 relative">


                      <FormLabel className="w-[150px]">Số ghế</FormLabel>
                      <FormControl className="min-w-fit">
                        <Input placeholder='Nhập số ghế' {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>

                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1">
                    <div className="flex items-center gap-x-5 relative">


                      <FormLabel className="w-[150px]">Giá ghế</FormLabel>
                      <FormControl className="min-w-fit">
                        <Input placeholder='Giá tiền' {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>

                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='room_status'
              render={({ field }) => (
                <FormItem className="grid grid-cols-1">
                  <div className="flex items-center gap-x-5">


                    <FormLabel className="w-[150px]">Trạng thái phòng</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder='Chọn trạng thái phòng' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Trạng thái phòng</SelectLabel>
                          <SelectItem value="active">Đang chiếu</SelectItem>
                          <SelectItem value="maintenance">Bảo trì</SelectItem>
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
              name='room_type'
              render={({ field }) => (
                <FormItem className="grid grid-cols-1">
                  <div className="flex items-center gap-x-5">


                    <FormLabel className="w-[150px]">Loại phòng</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder='Chọn kiểu phòng' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Loại phòng</SelectLabel>
                          <SelectItem value='2D'>Phòng 2D</SelectItem>
                          <SelectItem value='3D'>Phòng 3D</SelectItem>
                          <SelectItem value='VIP'>Phòng VIP</SelectItem>
                          <SelectItem value='normal'>Phòng thường</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button className="ml-auto" type='submit'>Thêm phòng</Button>
          </form>
        </Form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default AddRoom;
