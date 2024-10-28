import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"; // FormMessage to show errors
import { Input } from "@/components/ui/input";
import { CardContent } from "../../../../components/ui/card";
import { Label } from "@/components/ui/label"; // Label for input fields
import { UserRegister } from "@/types/user";

// Schema validation with Zod
const formSchema = z.object({
  user_name: z.string().min(1, { message: "Tên đăng nhập là bắt buộc" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  full_name: z.string().min(1, { message: "Họ tên là bắt buộc" }),
  phone: z.string().optional(),
  loyalty_points: z.number().optional(),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  confirm_password: z.string().min(6, { message: "Vui lòng xác nhận mật khẩu" }),
}).refine((data) => data.password === data.confirm_password, {
  message: "Mật khẩu không khớp",
  path: ["confirm_password"],
});

// Define form data type based on Zod schema
type FormSchemaType = z.infer<typeof formSchema>;
interface FormRegisterProps {
  onSubmit: (data: UserRegister) => Promise<void>; 
}

export function FormRegister({ onSubmit }: FormRegisterProps) {

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: "",
      email: "",
      full_name: "",
      phone: "",
      loyalty_points: 0,
      password: "",
      confirm_password: "",
    },
  });

    const dataSubmit = async (data) => {
        await onSubmit(data)
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(dataSubmit)} className="space-y-8">
        <CardContent className="space-y-2">
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="user_name">Tên đăng nhập</Label>
                  <Input id="user_name" {...field} />
                  {form.formState.errors.user_name && (
                    <FormMessage>{form.formState.errors.user_name.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" {...field} />
                  {form.formState.errors.email && (
                    <FormMessage>{form.formState.errors.email.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="full_name">Họ tên</Label>
                  <Input id="full_name" {...field} />
                  {form.formState.errors.full_name && (
                    <FormMessage>{form.formState.errors.full_name.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" {...field} />
                  {form.formState.errors.phone && (
                    <FormMessage>{form.formState.errors.phone.message}</FormMessage>
                  )}
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
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input id="password" type="password" {...field} />
                  {form.formState.errors.password && (
                    <FormMessage>{form.formState.errors.password.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="confirm_password">Nhập lại mật khẩu</Label>
                  <Input id="confirm_password" type="password" {...field} />
                  {form.formState.errors.confirm_password && (
                    <FormMessage>
                      {form.formState.errors.confirm_password.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
        </CardContent>

        <div className="flex justify-center">
          <Button type="submit">Đăng Ký</Button>
        </div>
      </form>
    </Form>
  );
}
