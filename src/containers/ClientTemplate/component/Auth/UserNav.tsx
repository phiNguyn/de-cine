import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { StorageKeys } from '@/constants/StorageKeys'
import { LogOutIcon, User2Icon, UserIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from '.'
import { useTicketStore } from '@/store/intex'

export function UserNav() {
  const { clearTicketData } = useTicketStore()
  const navigate = useNavigate()
  const user = localStorage.getItem(StorageKeys.USER);
  const userdata = localStorage.getItem(StorageKeys.USERDATA)
  let role = null;
  let userData = null
  if (user && userdata) {
    try {
      role = JSON.parse(user)?.role; // Adjust according to your user object structure
      userData = JSON.parse(userdata)

    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem(StorageKeys.USERDATA)
      localStorage.removeItem(StorageKeys.USER)
      localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
      localStorage.removeItem(StorageKeys.REFRESH_TOKEN)
      clearTicketData()
      window.location.href = "/"
    } catch (error) {
      console.log(error);

    }
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8 border-primary border'>

            <AvatarFallback><User2Icon /></AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        {role === 'admin' ? (
          <DropdownMenuLabel className='font-normal cursor-pointer'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>{userData.user_name}</p>
              <div onClick={() => navigate('/admin')} className='text-xs leading-none text-muted-foreground'>
                Vào admin
              </div>
            </div>
          </DropdownMenuLabel>
        ) : (
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'> {userData.user_name}</p>
              <p className='text-xs leading-none text-muted-foreground'>
                {userData.email}
              </p>
            </div>
          </DropdownMenuLabel>
        )}

        <DropdownMenuSeparator />
        <Dropdown />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className=' mr-5' />
            <Link to={'/UserProfile'}>Tài khoản</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className=' rotate-180 mr-5' />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
