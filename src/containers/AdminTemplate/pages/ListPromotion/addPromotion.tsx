import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import promotionAPI from "@/apis/promotion";
import { Loader2 } from "lucide-react";
import { usePromotionStore } from "@/store/Promotion";

const formSchema = z.object({
  promotion_name: z.string().min(5, { message: "Tên khuyến mãi phải có ít nhất 5 ký tự." }),
  discount_type: z.enum(["percent", "price"], { message: "Loại khuyến mãi không hợp lệ." }),
  discount_value: z.preprocess((value) => parseFloat(value as string) || 0, z.number().min(0, { message: "Phải nhập giá trị từ 0 đến 100." })),
  start_date: z.string(),
  end_date: z.string(),
  promotion_point: z.preprocess((value) => parseInt(value as string, 10) || 0, z.number().min(0, { message: "Điểm phải là số nguyên không âm." })),
  min_purchase_amount: z.number().optional(),
  max_discount_amount: z.number().optional(),
  description: z.string().optional(),
  promotion_image: z.any().refine(
    (value) => value && (!Array.isArray(value) || value.length > 0),
    { message: "Hãy chọn file" }
  ).nullable(),
});

export type PromotionFormValues = z.infer<typeof formSchema>;

const AddPromotion = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { addPromotion } = usePromotionStore((state) => state);

  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discount_type: "percent",
    },
  });

  const dataSubmit = async (data: PromotionFormValues) => {
    setIsLoading(true);
    try {
      const {promotion_image} = data
      const submitPromotion = {
        ...data,
        promotion_image: promotion_image[0],
      };

      const resp = await promotionAPI.addPromotion(submitPromotion);
      console.log(resp); // Kiểm tra phản hồi từ API

      if (resp?.status === 201) {
        toast.success("Đã thêm khuyến mãi", {
           duration: 1000,
          });
        addPromotion(resp.data.promotion);
        form.reset();
        setOpen(false);
      }
    } catch (error) {
      console.error("Failed to add promotion", error);
      toast.error("Không thể thêm khuyến mãi, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };
  //     if (resp?.status === 201) {
  //       toast.success("Đã thêm khuyến mãi" );
  //       addPromotion(resp);
  //       form.reset();
  //       setOpen(false);
  //     }
  //   } catch (error) {
  //     console.error("Failed to add promotion", error);
  //     toast.error("Không thể thêm khuyến mãi, vui lòng thử lại.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Thêm khuyến mãi</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle hidden>Thêm khuyến mãi</DialogTitle>
          <DialogDescription hidden>Thêm khuyến mãi mới</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(dataSubmit)} className='space-y-8'>

            {/* Tên khuyến mãi */}
            <div className="flex flex-row gap-6">
              <FormField control={form.control} name="promotion_name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên khuyến mãi</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên khuyến mãi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
                  <FormField
                control={form.control}
                name="promotion_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh chính</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
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
                    {preview && <img src={preview} alt="Preview" className="my-2.5 w-40" />}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Loại khuyến mãi (percent/price) */}
              <FormField control={form.control} name="discount_type" render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại khuyến mãi</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full p-2 border rounded text-black">
                      <option value="percent" >Phần trăm</option>
                      <option value="price">Giá trị cố định</option>
                    </select>
                  </FormControl>
                </FormItem>
              )} />
            </div>
            <div className="flex gap-9">
              {/* Giá trị khuyến mãi */}
              <FormField control={form.control} name="discount_value" render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá trị khuyến mãi</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nhập giá trị"
                      min="0"
                      max="100"
                      step="1"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="promotion_point" render={({ field }) => (
                <FormItem>
                  <FormLabel>Điểm để đổi khuyến mãi</FormLabel>
                  <FormControl>
                    <Input {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )} />
            </div>

            <div className="flex gap-7">
              {/* Ngày bắt đầu khuyến mãi */}
              <FormField control={form.control} name="start_date" render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày bắt đầu</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )} />

              {/* Ngày kết thúc khuyến mãi */}
              <FormField control={form.control} name="end_date" render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày kết thúc</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )} />
            </div>

            <div className="flex gap-5">
              {/* Mô tả khuyến mãi */}
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập mô tả khuyến mãi" {...field} />
                  </FormControl>
                </FormItem>
              )} />

              {/* Hiển thị khuyến mãi */}

            </div>
            <div className="flex gap-5">
              <FormField control={form.control} name="min_purchase_amount" render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá trị đơn hàng tối thiểu</FormLabel>
                  <FormControl>
                    <Input {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="max_discount_amount" render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá trị giảm tối đa</FormLabel>
                  <FormControl>
                    <Input {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )} />
            </div>


            <Button disabled={isLoading} type="submit">
              {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Thêm khuyến mãi"}
            </Button>
          </form>
        </Form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default AddPromotion;
