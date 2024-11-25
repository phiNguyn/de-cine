import { Armchair, Film, LayoutDashboard, ShoppingBasket, SquarePercent, Ticket, TvMinimal, Users, Videotape } from "lucide-react"

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/admin',
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: 'Danh sách phim',
    href: '/admin/listMovie',
    icon: <Film size={18} />,
  },
  {
    title: 'Danh sách vé',
    href: '/admin/listTicket',
    icon: <Ticket size={18} />,
  },

  {
    title: 'Danh sách phòng',
    href: '/admin/listRoom',
    icon: <TvMinimal size={18} />,
  },
  {
    title: 'Suất chiếu',
    href: '/admin/listShowTimes',
    icon: <Armchair size={18} />,
  },
  {
    title: 'Thể loại phim',
    href: '/admin/listGenreMovies',
    icon: <Videotape size={18} />,
  },
  {
    title: 'Tài Khoản',
    label: '',
    href: '/admin/users',
    icon: <Users size={18} />,
  },
  {
    title: 'Mã Khuyến Mãi',
    label: '',
    href: '/admin/users',
    icon: <SquarePercent size={18} />,
  },
  {
    title: 'Sản phẩm',
    label: '',
    href: '/admin/products',
    icon: <ShoppingBasket size={18} />
  },
  // {
  //   title: 'Authentication',
  //   label: '',
  //   href: '',
  //   icon: <Users size={18} />,
  //   sub: [
  //     {
  //       title: 'Sign In (email + password)',
  //       label: '',
  //       href: '/sign-in',
  //       icon: <LogIn size={18} />,
  //     },
  //     {
  //       title: 'Sign In (Box)',
  //       label: '',
  //       href: '/sign-in-2',
  //       icon: <LogIn size={18} />,
  //     },
  //     {
  //       title: 'Sign Up',
  //       label: '',
  //       href: '/sign-up',
  //       icon: <KeyRound size={18} />,
  //     },
  //     {
  //       title: 'Forgot Password',
  //       label: '',
  //       href: '/forgot-password',
  //       icon: <FileLock size={18} />,
  //     },
  //     {
  //       title: 'OTP',
  //       label: '',
  //       href: '/otp',
  //       icon: <ScanLine size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Requests',
  //   label: '10',
  //   href: '/requests',
  //   icon: <GitPullRequest size={18} />,
  //   sub: [
  //     {
  //       title: 'Trucks',
  //       label: '9',
  //       href: '/trucks',
  //       icon: <Truck size={18} />,
  //     },
  //     {
  //       title: 'Cargos',
  //       label: '',
  //       href: '/cargos',
  //       icon: <Box size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Analysis',
  //   label: '',
  //   href: '/analysis',
  //   icon: <ChartColumn size={18} />,
  // },
  // {
  //   title: 'Extra Components',
  //   label: '',
  //   href: '/extra-components',
  //   icon: <LayoutDashboard size={18} />,
  // },
  // {
  //   title: 'Error Pages',
  //   label: '',
  //   href: '',
  //   icon: <CircleX size={18} />,
  //   sub: [
  //     {
  //       title: 'Not Found',
  //       label: '',
  //       href: '/404',
  //       icon: <CircleX size={18} />,
  //     },
  //     {
  //       title: 'Internal Server Error',
  //       label: '',
  //       href: '/500',
  //       icon: <ServerOff size={18} />,
  //     },
  //     {
  //       title: 'Maintenance Error',
  //       label: '',
  //       href: '/503',
  //       icon: <ShieldOff size={18} />,
  //     },
  //     {
  //       title: 'Unauthorised Error',
  //       label: '',
  //       href: '/401',
  //       icon: <ShieldOff size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Settings',
  //   label: '',
  //   href: '/admin/settings',
  //   icon: <Settings size={18} />,
  // },
]
