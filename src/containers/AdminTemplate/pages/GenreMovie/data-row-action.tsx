// import { Row } from '@tanstack/react-table'

// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuRadioGroup,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { useState } from 'react';
// import { Dialog } from '@/components/ui/dialog';
// import EditGenreMovie from './editGenreMovie';
// import { MoreHorizontal } from 'lucide-react';


// interface DataTableRowActionsProps<TData> {
//   row ?: Row<TData>
// }

// export function DataTableRowActions<TData>({
//   row,
// }: DataTableRowActionsProps<TData>) {
  
//   const [openDialog, setOpenDialog] = useState(false); // Trạng thái mở dialog

//   const handleEditClick = () => {
//     setOpenDialog(true); // Mở dialog
//   };

//   return (
//     <>
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant='ghost'
//           className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
//         >
//               <MoreHorizontal className="h-4 w-4" />
//               <span className='sr-only'>Open menu</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align='end' className='w-[160px]'>
//         <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
//         <DropdownMenuItem>Make a copy</DropdownMenuItem>
//         <DropdownMenuItem>Favorite</DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuSub>
//           <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
//           <DropdownMenuSubContent>
//             <DropdownMenuRadioGroup >
               
//             </DropdownMenuRadioGroup>
//           </DropdownMenuSubContent>
//         </DropdownMenuSub>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem>
//           Delete
//           <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//     <EditGenreMovie open = {openDialog}  onClose={() => setOpenDialog(false)}/>
//     </>
//   )
// }