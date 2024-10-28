import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"; // Thêm FormMessage để hiển thị lỗi
import { Input } from "@/components/ui/input";
import { CardContent } from "../../../../components/ui/card";
import { useState } from "react";
import { UserLogin } from "@/types/user";

// Schema validation với Zod
const formSchema = z.object({
  user_name: z.string().min(1,{ message: "User name không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});


interface FormLoginProps {
  onSubmit: (data: UserLogin) => void;
}

export function FormLogin({ onSubmit }: FormLoginProps) {

  const [isLoading, setIsLoading] = useState(false)
  console.log(isLoading);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: '',
      password: '',
    },
  })

  const dataSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    console.log(data)
    onSubmit(data)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }



  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(dataSubmit)} >
        {/* Email Field */}
        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <CardContent className="space-y-2">
                <div className="flex flex-col">
                  <label htmlFor="user_name">Email</label>
                  <Input
                    id="user_name"
                    className="mt-1"
                    {...field}
                  />
                  {/* Hiển thị lỗi cho user_name */}
                  {form.formState.errors.user_name && (
                    <FormMessage>
                      {form.formState.errors.user_name.message}
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

