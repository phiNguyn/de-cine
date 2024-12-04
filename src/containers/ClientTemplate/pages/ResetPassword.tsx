import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Thêm FormMessage để hiển thị lỗi
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { AuthAPI } from "@/apis/auth";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

// Schema validation với Zod
const formSchema = z.object({
    password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
    password_confirmation: z.string({ message: "Vui lòng không để trống" }).min(6, { message: "Vui lòng xác nhận mật khẩu" })
}).refine((data) => data.password === data.password_confirmation, {
    message: "Mật khẩu không khớp",
    path: ["confirm_password"],
})
    ;




const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    // Lấy giá trị của token
    const token = searchParams.get("token");
    const [isLoading, setIsLoading] = useState(false)

    const [typePassword, setTypePassword] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    })

    const dataSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true); // Bắt đầu loading
        try {
            const { password, password_confirmation } = data
            const submitData = {
                password,
                token,
                password_confirmation
            }
            const resp = await AuthAPI.resetPassword(submitData)
            if (resp.status == 200) {
                toast.success(resp.message)
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false); // Kết thúc loading
        }

    }



    return (
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(dataSubmit)} >

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
                <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-x-2 items-center">
                                <FormLabel>Nhập lại mật khẩu</FormLabel>
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
                <div className="flex justify-center">
                    <Button disabled={isLoading} type="submit" size="lg">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang thực hiện
                            </>
                        ) : (
                            'Cấp lại mật khẩu'
                        )}
                    </Button>

                </div>
            </form>
        </Form>
    );
};


export default ResetPassword