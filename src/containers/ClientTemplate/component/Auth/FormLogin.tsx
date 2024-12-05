import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Thêm FormMessage để hiển thị lỗi
import { Input } from "@/components/ui/input";
import { CardContent } from "../../../../components/ui/card";
import { useState } from "react";
import { UserLogin } from "@/types/user";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { AuthAPI } from "../../../../apis/auth";

// Schema validation với Zod
const formSchema = z.object({
  user_name: z.string().min(1, { message: "Không được để trống" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});


interface FormLoginProps {
  onSubmit: (data: UserLogin) => void;
  setIsLoading: (isLoading: boolean) => void; // Hàm setLoading để cập nhật trạng thái loading
}

export function FormLogin({ onSubmit, setIsLoading }: FormLoginProps) {
  const [typePassword, setTypePassword] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: '',
      password: '',
    },
  })

  const dataSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true); // Bắt đầu loading
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Kết thúc loading
    }

  }

  const handleLoginGoogle = async () => {
    try {
      const resp = await AuthAPI.signInWithGoogle()
      if (resp) {
        console.log(resp);

        window.location.href = resp.url
      }
    } catch (error) {
      console.log(error);

    }
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
                <div className="flex flex-col mt-2">
                  <FormLabel>Tài Khoản</FormLabel>
                  <FormControl>
                    <Input
                      id="user_name"
                      className="mt-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                <FormLabel>Nhập mật khẩu</FormLabel>
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
                <FormMessage />
              </CardContent>
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button disabled={form.formState.isSubmitting} type="submit" size="lg">
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang đăng nhập
              </>
            ) : (
              'Đăng nhập'
            )}
          </Button>
        </div>
        <div className="flex justify-center">
          <Button type="button" onClick={handleLoginGoogle}><FaGoogle /></Button>
        </div>
      </form>
    </Form>
  );
};

