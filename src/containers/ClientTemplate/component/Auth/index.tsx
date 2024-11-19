import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "../../../../components/theme-provider";
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
import { Moon, Sun } from 'lucide-react';
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { AuthAPI } from "@/apis/auth";
import { UserLogin } from "@/types/user";
import toast, { Toaster } from "react-hot-toast";
import { StorageKeys } from "@/constants/StorageKeys";

// Dropdown component from nguyen-home
const Dropdown = ({ className }: { className?: string }) => {
  const { setTheme } = useTheme();
  return (
    <div className={cn("mt-5 w-full", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full" variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
  const { login } = useAuth();

  const handleLogin = async (data: UserLogin) => {
    try {
      const resp = await AuthAPI.login(data);
         
        const {user , message} = resp

        console.log(user);
        
      if (user.role) {
        toast.success(message);
        login({ role: user.role });
        localStorage.setItem(StorageKeys.USERDATA, JSON.stringify(user));
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } 
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi đăng nhập.");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRegister = async (data: any) => {
    try {
      const resp = await AuthAPI.register(data);
      if (resp) {
        if (resp.status == 201) {
            toast.success("Đã tạo thài khoản thành công")
         
        } else {
          toast.error("Email hoặc user_name đã tồn tại");
        }
      } else {
        toast.error("Email hoặc user_name đã tồn tại");

      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi đăng ký.");
    }
  };

  return (
    <>
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Đăng Nhập</TabsTrigger>
        <TabsTrigger value="signup">Đăng Ký</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <FormLogin onSubmit={handleLogin} />
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <FormRegister onSubmit={handleRegister}  />
        </Card>
      </TabsContent>
    </Tabs>
    <Toaster/>
    </>
  );
};

export { Auth, TabsDemo, Dropdown };
