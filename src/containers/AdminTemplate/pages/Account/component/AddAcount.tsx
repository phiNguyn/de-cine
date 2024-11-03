import { UserAPI } from "@/apis/user";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { User } from "@/types/user";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FC, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/store/Users";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

const profileFormSchema = z.object({
    user_name: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters.' })
      .max(20, { message: 'Username must not be longer than 30 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email.' }),
    full_name: z.string().min(2, { message: 'Please enter a valid full name.' }),
    phone: z.string().length(10, { message: 'Phone number must be 10 digits long.' }),
    role: z.string(),
    loyalty_points: z.number().nonnegative({ message: 'Loyalty points must be a non-negative number.' }),
    password : z.string().min(2, {message : "Mật khẩu phải ít nhất 8 kí tự"})
  });
  
  export type ProfileFormValues = z.infer<typeof profileFormSchema>;
  
const AddAccount = () => {
    const [type, setType] = useState(true)
  const [open, setOpen] = useState(false);
  const add = useUser((state) => state.addUser)
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      user_name: '',
      email: '',
      full_name: '',
      phone: '',
      role: '',
      loyalty_points: 0,
      password : ""
    },
  });

 async function dataSubmit(data: ProfileFormValues) {
   
    try {
    
         const resp = await UserAPI.addUser(data)
        if(resp?.status == 201) {
            add(resp.data)
            toast.success("Đã thêm tài khoản")
            form.reset()
            setOpen(false)
        }
       else {
         toast.error("Email hoặc tài khoản đã được sử dụng")

       } 
      
    } catch (error) {
        console.log(error);
        
    }
  }
  

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Thêm tài khoản</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[1000px]">
        <DialogHeader>
          <DialogTitle>Thêm Tài Khoản</DialogTitle>
          <DialogDescription>
            Thêm tài khoản người dùng mới
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(dataSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='user_name'
          render={({ field }) => (
            <FormItem className="grid grid-cols-1">
                <div className="flex items-center gap-x-5">


              <FormLabel className="w-[150px]">Username</FormLabel>
              <FormControl className="min-w-fit">
                <Input placeholder='Enter username' {...field} />
              </FormControl>
                </div>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className="grid grid-cols-1">
                <div className="flex items-center gap-x-5 relative">


              <FormLabel className="w-[150px]">Mật khẩu</FormLabel>
              <FormControl className="min-w-fit">
                <Input   type={`${type ? 'text' : 'password'}`}  placeholder='Nhập mật khẩu' {...field} />
              </FormControl>
              <div onClick={() => setType((prev) => !prev)} className="absolute right-3 cursor-pointer">
              {type ? 
                <Eye className=""/>
                :  <EyeOff className=""/>
            }

              </div>
                </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className="grid grid-cols-1">
                <div className="flex items-center gap-x-5">


              <FormLabel className="w-[150px]">Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter email' {...field} />
              </FormControl>
                </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='full_name'
          render={({ field }) => (
            <FormItem className="grid grid-cols-1">
                <div className="flex items-center gap-x-5">
              <FormLabel className="w-[150px]">Full Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter full name' {...field} />
              </FormControl>
</div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem className="grid grid-cols-1">
                <div className="flex items-center gap-x-5">
              <FormLabel className="w-[150px]">Phone</FormLabel>
              <FormControl>
                <Input placeholder='Enter phone number' {...field} />
              </FormControl>
</div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem className="grid grid-cols-1">
                <div className="flex items-center gap-x-5">


              <FormLabel className="w-[150px]">Role</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder='Select a role' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value='admin'>Admin</SelectItem>
                    <SelectItem value='user'>Khách hàng</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
                </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='loyalty_points'
          render={({ field }) => (
            <FormItem className="grid grid-cols-1">
                <div className="flex items-center gap-x-5">

              <FormLabel className="w-[150px]">Loyalty Points</FormLabel>
              <FormControl>
                <Input type='number' placeholder='Enter loyalty points' {...field} />
              </FormControl>
              <FormMessage />
                </div>
            </FormItem>
          )}
        />
        <Button type='submit'>Thêm tài khoản</Button>
      </form>
    </Form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default AddAccount;
