import { Button } from "@/components/ui/button";
import { useUser } from "@/store/Users";
import { useParams } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from '@hookform/resolvers/zod';
import {  z } from "zod";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const profileFormSchema = z.object({
    id_account : z.number(),
  user_name: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(20, { message: 'Username must not be longer than 30 characters.' }).optional(),
  email: z.string().email({ message: 'Please enter a valid email.' }).optional(),
  full_name: z.string().min(2, { message: 'Please enter a valid full name.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }).max(10, {message : "Số điện thoại không hợp lệ"}),
  role: z.string(),
  loyalty_points: z.number(),
});

 export type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface AccountUpdateProp{


    onSubmit: (data: ProfileFormValues) => void
  }
const AccountUpdate : React.FC<AccountUpdateProp> = ({onSubmit}) => {
  const { id } = useParams<string>();
  const {getUserById} = useUser((state) => state)
  const user = getUserById(Number(id));
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
        id_account : user?.id_account ,
      user_name: user?.user_name || '',
      email: user?.email || '',
      full_name: user?.full_name || '',
      phone: user?.phone || '',
      role: user?.role || '',
      loyalty_points:Number(user?.loyalty_points),
    },
  });

  function dataSubmit(data: ProfileFormValues) {
    const {full_name,phone,role,id_account,loyalty_points} = data
    const postData = {
        full_name,phone,role,id_account,loyalty_points
    }
     onSubmit(postData)
        
    
    
  }

  return (
    <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(dataSubmit)} className='space-y-8'>
                <div className="hidden">
            <FormField 
                
                control={form.control}
                name='id_account'
                render={({ field }) => (
                    <FormItem className="w-fit">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input  placeholder='Enter username' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                </div>
               
              <FormField
                control={form.control}
                name='user_name'
                render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input disabled placeholder='Enter username' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled placeholder='Enter email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='full_name'
                render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter full name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter phone number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại tài khoản</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder='Select a role' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          <SelectItem   value='admin'>Admin</SelectItem>
                          <SelectItem value='user'>Khách hàng</SelectItem>
                          {/* Add more roles as needed */}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='loyalty_points'
                
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loyalty Points</FormLabel>
                    <FormControl className="w-fit">
                      <Input  type='number' placeholder='Enter loyalty points' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Cập nhật thông tin</Button>
            </form>
          </Form>
      

    </>

  );
};

export default AccountUpdate;
