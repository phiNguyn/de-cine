import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import productAPI from "@/apis/product";
import { useProductStore } from "@/store/Products";
import { Loader2 } from "lucide-react";
const formSchema = z.object({
    product_name: z.string({ message: "Trường này không được để trống" }).min(5, { message: "Tên sản phẩm phải có ít nhất 5 ký tự." }),
    price: z.number(),
    description: z.string().optional(),
    is_active: z.boolean(),
    image_product: z.any().refine(
        (value) => {
            // Kiểm tra nếu `image_main` trống
            return value && (!Array.isArray(value) || value.length > 0);
        },
        {
            message: 'Hãy chọn file',
            path: ['image_product'], // Chỉ định trường bị lỗi
        }
    ).nullable(),
})
export type ProductFormValues = z.infer<typeof formSchema>;

const AddProduct = () => {
    const [preview, setPreview] = useState<string | null>(null);

    const { addProduct } = useProductStore((state) => state)
    const [isLoading, setIsLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            is_active: false
        }
    });

    async function dataSubmit(data: ProductFormValues) {
        setIsLoading(true)
        console.log(data);
        try {
            const { image_product, is_active } = data
            const submitProduct = {
                ...data, image_product: image_product[0],
                is_active: is_active ? 1 : 0,
            }
            const resp = await productAPI.addProduct(submitProduct)
            if (resp?.status === 201) {
                toast.success("Đã thêm sản phẩm", {
                    duration: 1000,
                })
                addProduct(resp.data.product)
                form.reset()
                setOpen(false)
            }

        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false); // Kết thúc loading
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Thêm sản phẩm</Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Thêm sản phẩm</DialogTitle>
                    <DialogDescription>
                        Thêm sản phẩm mới
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(dataSubmit)} className='space-y-8'>
                        <div className="grid grid-cols-1 gap-y-5">

                            <FormField
                                control={form.control}
                                name='product_name'
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-1">
                                        <div className="flex items-center gap-x-5">


                                            <FormLabel className="w-[150px]">Tên sản phẩm</FormLabel>
                                            <FormControl className="min-w-fit">
                                                <Input  {...field} />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image_product"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-1">
                                        <div className="flex gap-x-5 w-full  items-center">
                                            <FormLabel className="w-[150px]">Ảnh chính</FormLabel>
                                            <div className="w-full">
                                                {preview && <img src={preview} alt="Preview" className="my-2.5 w-40" />}
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        placeholder="..."
                                                        onChange={(e) => {
                                                            const file = e.target.files ? e.target.files[0] : null;
                                                            field.onChange(e.target.files);

                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    setPreview(reader.result as string);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            } else {
                                                                setPreview(null);
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-1">
                                        <div className="flex items-center gap-x-5 relative">


                                            <FormLabel className="w-[150px]">Mô tả</FormLabel>
                                            <FormControl className="min-w-fit">
                                                <Input  {...field} />
                                            </FormControl>

                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name='price'
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-1">
                                    <div className="flex items-center gap-x-5 relative">


                                        <FormLabel className="w-[150px]">Giá tiền</FormLabel>
                                        <FormControl className="min-w-fit">
                                            <Input {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>

                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="is_active" render={({ field }) => (
                            <FormItem className="w-full flex gap-x-5 items-center">
                                <FormLabel>Hiện sản phẩm</FormLabel>
                                <FormControl >
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        aria-readonly
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="w-full flex justify-between">

                            <Button disabled={isLoading} variant={"default"} type='submit'>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :
                                    'Thêm sản phẩm'
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
            <Toaster />
        </Dialog>
    );
};

export default AddProduct;
