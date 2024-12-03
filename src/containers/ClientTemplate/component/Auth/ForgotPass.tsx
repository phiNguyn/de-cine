import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Thêm FormMessage để hiển thị lỗi
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { AuthAPI } from "@/apis/auth";
import toast from "react-hot-toast";

// Schema validation với Zod
const formSchema = z.object({
    email: z.string({ message: "Vui lòng không để trống" }).email({ message: "Email không hợp lệ" }),
});


// interface FormLoginProps {
//     onSubmit: (data: UserLogin) => void;
//     setIsLoading: (isLoading: boolean) => void; // Hàm setLoading để cập nhật trạng thái loading
// }
export type ForgotPass = z.infer<typeof formSchema>;

export function ForGotPass() {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const dataSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true); // Bắt đầu loading
        try {

            const resp = await AuthAPI.forgot(data)
            if (resp?.status == 200) {
                toast.success(resp.data.message)
                setTimeout(() => {
                }, 500);
            } else {
                toast.error(resp?.data.message)
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
                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <CardContent className="space-y-2">
                                <div className="flex flex-col mt-2">
                                    <FormLabel>Nhập email</FormLabel>
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

