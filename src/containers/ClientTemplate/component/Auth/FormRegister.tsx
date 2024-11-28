/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // FormMessage to show errors
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Label for input fields
import { UserRegister } from "@/types/user";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

// Schema validation with Zod
const formSchema = z.object({
  user_name: z.string({ message: "Tên đăng nhập là bắt buộc" }).min(1, { message: "Tên đăng nhập là bắt buộc" }),
  email: z.string({ message: "Vui lòng không để trống" }).email({ message: "Email không hợp lệ" }),
  full_name: z.string({ message: "Vui lòng không để trống" }).min(1, { message: "Họ tên là bắt buộc" }),
  phone: z
    .string({ message: "Vui lòng không để trống" })
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, { message: "Số điện thoại không hợp lệ" }),
  loyalty_points: z.number().optional(),
  password: z.string({ message: "Vui lòng không để trống" }).min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  confirm_password: z.string({ message: "Vui lòng không để trống" }).min(6, { message: "Vui lòng xác nhận mật khẩu" }),
}).refine((data) => data.password === data.confirm_password, {
  message: "Mật khẩu không khớp",
  path: ["confirm_password"],
});

// Define form data type based on Zod schema
type FormSchemaType = z.infer<typeof formSchema>;
interface FormRegisterProps {
  onSubmit: (data: UserRegister) => Promise<void>;
  setIsLoading: (isLoading: boolean) => void; // Hàm setLoading để cập nhật trạng thái loading

}

export function FormRegister({ onSubmit, setIsLoading }: FormRegisterProps) {
  const [typePassword, setTypePassword] = useState(false)
  const [confirm, setConfirm] = useState(false)


  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   user_name: "",
    //   email: "",
    //   full_name: "",
    //   loyalty_points: 0,
    //   password: "",
    //   confirm_password: "",
    // },
  });

  const dataSubmit = async (data: any) => {
    setIsLoading(true); // Bắt đầu loading
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(dataSubmit)}>
        <div className="grid gap-y-4 p-4">
          <FormField
            control={form.control}
            name="user_name"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-x-2 items-center">
                  <FormLabel>Tên đăng nhập</FormLabel>
                  <FormMessage />
                </div>
                <Input id="user_name" {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-x-2 items-center">
                  <FormLabel >Email</FormLabel>
                  <FormMessage />
                </div>
                <Input id="email" {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-x-2 items-center">
                  <FormLabel >Họ tên</FormLabel>
                  <FormMessage />
                </div>
                <Input id="full_name" {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-x-2 items-center">
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormMessage />
                </div>
                <Input type="number"  {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="loyalty_points"
            render={({ field }) => (
              <input type="hidden" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-x-2 items-center">
                  <Label>Mật khẩu</Label>
                  <FormMessage />

                </div>
                <div className='flex items-center justify-between relative'>

                  <FormControl>
                    <Input type={`${typePassword ? 'text' : 'password'}`} placeholder='********' {...field} />
                  </FormControl>
                  <div onClick={() => setTypePassword((prev) => !prev)} className="absolute right-3 cursor-pointer">
                    {typePassword ?
                      <Eye />
                      : <EyeOff />
                    }
                  </div>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-x-2 items-center">
                  <Label>Nhập lại mật khẩu</Label>
                  <FormMessage />

                </div>
                <div className='flex items-center justify-between relative'>

                  <FormControl>
                    <Input type={`${confirm ? 'text' : 'password'}`} placeholder='********' {...field} />
                  </FormControl>
                  <div onClick={() => setConfirm((prev) => !prev)} className="absolute right-3 cursor-pointer">
                    {confirm ?
                      <Eye />
                      : <EyeOff />
                    }
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center items-start">
          <Button disabled={form.formState.isSubmitting} type="submit" size="lg">
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tạo tài khoản
              </>
            ) : (
              'Đăng ký'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
