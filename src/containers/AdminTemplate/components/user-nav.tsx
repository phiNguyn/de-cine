import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { useAuth } from '@/hooks'
import { useNavigate } from 'react-router-dom'

export function UserNav() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const handleLogout = () => {
    try {
      logout()
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='border border-black '>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/01.png' alt='@shadcn' />
            <AvatarFallback>admin3</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>admin3</p>
            <p className='text-xs leading-none text-muted-foreground'>
              phinguyenq12@gmail.com
            </p>

          </div>

        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate('/')} className='cursor-pointer'>
            Về trang chủ
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
