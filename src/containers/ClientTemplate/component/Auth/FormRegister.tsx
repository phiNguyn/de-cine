import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"; // FormMessage to show errors
import { Input } from "@/components/ui/input";
import { CardContent } from "../../../../components/ui/card";
import { Label } from "@/components/ui/label"; // Label for input fields

// Schema validation with Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Họ tên là bắt buộc" }),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, { message: "Số điện thoại không hợp lệ" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  confirmPassword: z.string().min(6, { message: "Vui lòng xác nhận mật khẩu" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});

// Define form data type based on Zod schema
type FormSchemaType = z.infer<typeof formSchema>;

const FormRegister = () => {
  // UseForm hook with zodResolver for validation
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log("Form Submitted: ", data);
    // Perform additional actions (e.g. API calls)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CardContent className="space-y-2">
          <div className="grid gap-4 py-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Họ tên</Label>
                  <Input id="name" {...field} />
                  {form.formState.errors.name && (
                    <FormMessage>{form.formState.errors.name.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Phone Field */}
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

            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="confirm-password">Nhập lại mật khẩu</Label>
                  <Input id="confirm-password" type="password" {...field} />
                  {form.formState.errors.confirmPassword && (
                    <FormMessage>
                      {form.formState.errors.confirmPassword.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
        </CardContent>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit">Đăng Ký</Button>
        </div>
      </form>
    </Form>
  );
};

export { FormRegister };
