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

const formSchema = z.object({
  user_name: z
    .string()
    .min(1, { message: 'Please enter your email' }),
  password: z
    .string({message : 'Please enter your password'})
})
interface FormLoginProps {
  onSubmit: (data: UserLogin) => void;
}
export function UserAuthForm({ onSubmit }: FormLoginProps) {
  const [isLoading, setIsLoading] = useState(false)
  console.log(isLoading);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: '',
      password: '',
    },
  })

  const dataSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    console.log(data)
    onSubmit(data)
    setTimeout(() => {
      setIsLoading(false)
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
                  <FormLabel>User Name</FormLabel>
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
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>

                  </div>
                  <FormControl>
                    <Input type='password' placeholder='********' {...field} />
                  </FormControl>
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