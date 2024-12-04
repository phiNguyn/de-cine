/* eslint-disable no-empty-pattern */
// PromotionActions.tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Promotion } from "."; // Đảm bảo đường dẫn đúng

type PromotionActionsProps = {
  promotion: Promotion;
};

const PromotionActions: React.FC<PromotionActionsProps> = ({ }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
      
        <DropdownMenuSeparator />
        <DropdownMenuItem>View promotion details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PromotionActions;
