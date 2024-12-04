import { StorageKeys } from '@/constants/StorageKeys';
import { UserAuthForm } from './user-authForm'
import { AuthAPI } from '@/apis/auth';
import { useAuth } from '@/hooks';
import { UserLogin } from '@/types/user';
import toast, { Toaster } from 'react-hot-toast'
import Logo from "/img/logoDev.png"
import { useState } from 'react';
export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth()
  const handleLogin = async (data: UserLogin) => {
    try {
      console.log(isLoading);

      const resp = await AuthAPI.login(data)
      if (resp.status == 200 && resp.user) {
        const { user, message } = resp;
        toast.success(message);
        login({ role: user.role });
        localStorage.setItem(StorageKeys.USERDATA, JSON.stringify(user));
        setTimeout(() => {
          window.location.href = '/admin';
        }, 2000);
      }

    } catch (error) {
      console.log(error);

      toast.error("Tài khoản hoặc mật khẩu không đúng");


    }
  }
  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2  lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <div className='relative z-20 flex items-center text-lg font-medium'>

            De - Cine
          </div>

          <img src={Logo}
            className='relative m-auto'
            width={301}
            height={60}
            alt='Vite'
          />


        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>

            <div className='flex flex-col space-y-2 text-left'>

              <h1 className='text-2xl font-semibold tracking-tight'>Đăng Nhập</h1>

            </div>
            <UserAuthForm setIsLoading={setIsLoading} onSubmit={handleLogin} />
            <Toaster />
          </div>
        </div>
      </div>
    </>
  )
}
