import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"; // Thêm FormMessage để hiển thị lỗi
import { Input } from "@/components/ui/input";
import { CardContent } from "../ui/card";

// Schema validation với Zod
const formSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

// Kiểu dữ liệu của form
type FormSchemaType = z.infer<typeof formSchema>;

const FormLogin = () => {
  const fakeUser = [
    { email: "user1@example.com", password: "password123" },
  ];

  // Sử dụng useForm hook với zodResolver để xác thực form, chỉ rõ kiểu dữ liệu FormSchemaType
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Hàm xử lý khi submit form
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    const user = fakeUser.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (user) {
      console.log("Đăng nhập thành công:", user);
      // Thực hiện hành động sau khi đăng nhập thành công, như điều hướng đến trang chính
    } else {
      console.log("Thông tin đăng nhập không đúng");
      // Thông báo lỗi đăng nhập không đúng
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <CardContent className="space-y-2">
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    className="mt-1"
                    {...field}
                  />
                  {/* Hiển thị lỗi cho email */}
                  {form.formState.errors.email && (
                    <FormMessage>
                      {form.formState.errors.email.message}
                    </FormMessage>
                  )}
                </div>
              </CardContent>
            </FormItem>
          )}
        />
        
        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <CardContent className="space-y-2">
                <div className="flex flex-col">
                  <label htmlFor="password">Mật Khẩu</label>
                  <Input
                    id="password"
                    className="mt-1"
                    type="password"
                    {...field}
                  />
                  {/* Hiển thị lỗi cho password */}
                  {form.formState.errors.password && (
                    <FormMessage>
                      {form.formState.errors.password.message}
                    </FormMessage>
                  )}
                </div>
              </CardContent>
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit">Đăng Nhập</Button>
        </div>
      </form>
    </Form>
  );
};

export { FormLogin };
