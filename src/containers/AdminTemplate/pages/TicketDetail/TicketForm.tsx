import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Định nghĩa schema cho form
const formSchema = z.object({
  movieName: z.string().min(2, { message: "Tên phim phải có ít nhất 2 ký tự." }),
  seat: z.string().min(1, { message: "Ghế ngồi không được để trống." }),
  room: z.string().min(1, { message: "Phòng không được để trống." }),
  ticketId: z.string().min(1, { message: "Mã vé không được để trống." }),
  combo: z.string().optional(),
  paymentMethod: z.string().optional(),
  status: z.string().optional(),
  price: z.string().optional(),
});

export function TicketForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movieName: "Làm Giàu Với Ma",
      seat: "A1",
      room: "1",
      ticketId: "A0000001",
      combo: "Family Combo 69oz",
      paymentMethod: "Zalo Pay",
      status: "Thành Công",
      price: "60.000VND",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    // Xử lý khi submit
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Vé</h2>
          
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="movieName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên Phim</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ghế ngồi</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phòng</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng Thái</FormLabel>
                <FormControl>
                  <Input {...field} readOnly className="bg-green-100 text-green-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="ticketId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mã vé</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="combo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Combo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phương thức thanh toán</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button type="submit">Cập nhật</Button>
        </div>
      </form>
    </Form>
  );
}
