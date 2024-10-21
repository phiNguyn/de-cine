import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "../theme-provider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { FormLogin } from "./FormLogin";
import { DialogTitle } from "@radix-ui/react-dialog";
import { FormRegister } from "./FormRegister";
import {Moon , Sun } from 'lucide-react'
import { cn } from "@/lib/utils";
// Dropdown component from nguyen-home
const Dropdown = ({className} :{className ?: string}) => {
  const { setTheme } = useTheme();
  return (
    <div className={cn("mt-5 w-full",
      className
    )}>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button className="w-full" variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="cursor-pointer">
        <DropdownMenuLabel onClick={() => setTheme("light")}>Light</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
</div>
  );
};

// Auth component from main
const Auth = () => {



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Đăng Nhập</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex justify-center">Đăng Nhập Tài Khoản</DialogTitle>
        </DialogHeader>
        <TabsDemo />
      </DialogContent>
    </Dialog>
  );
};

// TabsDemo component from main
const TabsDemo = () => {
  return (
    <Tabs defaultValue="login" className="w-[400px] ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Đăng Nhập</TabsTrigger>
        <TabsTrigger value="signup">Đăng Ký</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <FormLogin />
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <FormRegister />
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export { Auth, TabsDemo, Dropdown };
