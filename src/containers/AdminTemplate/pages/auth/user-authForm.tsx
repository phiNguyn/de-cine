import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { UserLogin } from '@/types/user'
import { Eye, EyeOff } from 'lucide-react'

const formSchema = z.object({
  user_name: z
    .string()
    .min(1, { message: 'Nhập tài khoản' }),
  password: z
    .string().min(1, { message: 'Vui lòng nhập mật khẩu' })
})
interface FormLoginProps {
  onSubmit: (data: UserLogin) => void;
}
export function UserAuthForm({ onSubmit }: FormLoginProps) {
  const [typePassword, setTypePassword] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: '',
      password: '',
    },
  })

  const dataSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
    onSubmit(data)
    setTimeout(() => {
    }, 3000)
  }

  return (
    <div className={cn('grid gap-6')}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(dataSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='user_name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Tài khoản</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
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
                </FormItem>
              )}
            />
            <Button className='mt-2' type='submit'
            //  loading={isLoading}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
