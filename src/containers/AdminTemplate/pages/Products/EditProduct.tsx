import { Button } from "@/components/ui/button";
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
import { API_URL } from "@/constants/api";
import { Loader2 } from "lucide-react";
const formSchema = z.object({
    id_product: z.number().optional(),
    product_name: z.string().min(5, { message: "Tên sản phẩm phải có ít nhất 5 ký tự." }),
    price: z.number(),
    description: z.string().optional(),
    is_active: z.boolean(),
    imgOld: z.string().nullable(), // Thêm trường imgOld
    image_product: z.any().refine(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (arg: any) => {
            // Nếu `img` trống và không có `imgOld`, trả về lỗi
            if (!arg || (Array.isArray(arg) && arg.length === 0)) {
                return !!arg.parent?.imgOld; // Kiểm tra nếu có ảnh cũ
            }
            return true; // Có file mới hoặc ảnh cũ
        },
        {
            message: 'Hãy chọn file',
            path: ['image_product'], // Chỉ định trường bị lỗi
        }
    )
        .nullable(),
})
export type ProductFormValues = z.infer<typeof formSchema>;

const EditProduct = ({ selectedId, onClose }: { selectedId: number, onClose?: () => void }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const { getProductById, updateProduct } = useProductStore((state) => state)
    const [isLoading, setIsLoading] = useState(false);
    const product = getProductById(selectedId)
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id_product: product?.id_product,
            description: product?.description || "",
            price: Number(product?.price),
            product_name: product?.product_name,
            is_active: product?.is_active,
            imgOld: product?.image_product,
            image_product: null
        }
    });

    async function dataSubmit(data: ProductFormValues) {
        // const { image_product, is_active, price, product_name, description } = data
        // const submitProduct = {
        //     is_active: is_active ? 1 : 0, price, product_name, description,
        //     ...(image_product && { image_product: image_product[0] })

        // }
        // console.log(submitProduct);

        setIsLoading(true)
        try {
            const { image_product, is_active, price, product_name, description } = data
            const submitProduct = {
                is_active: is_active ? 1 : 0, price, product_name, description,
                ...(image_product && { image_product: image_product[0] })

            }
            const resp = await productAPI.updateProduct(product?.id_product, submitProduct)
            if (resp?.status === 200) {
                updateProduct(resp.data)
                onClose?.()
                toast.success("Cập nhật sản phẩm thành công")
            }

        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false); // Kết thúc loading
        }
    }


    return (
        <>
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
                                            <div className="mx-auto gap-x-5  w-full flex">
                                                {product?.image_product && (
                                                    <img className="w-40 rounded-xl" src={`${API_URL.baseUrl}/${product.image_product}`} alt="Hình ảnh chính" />
                                                )}
                                                {preview && <img src={preview} alt="Preview" className="my-2.5 w-40" />}

                                            </div>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    placeholder="..."
                                                    accept="image/*" // Thêm thuộc tính này để chỉ định định dạng tệp hợp lệ
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
                            <FormLabel>Hiển thị sản phẩm</FormLabel>
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
                            {isLoading ?
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang cập nhật sản phẩm
                                </>
                                :
                                'Cập nhật'
                            }
                        </Button>
                        <Button variant={"outline"} onClick={onClose}>Đóng</Button>

                    </div>
                </form>
            </Form>
            <Toaster />
        </>
    );
};

export default EditProduct;
