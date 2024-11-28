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
  DialogDescription,
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
import { useState } from "react";
import { motion } from "framer-motion"
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
  const [open, setOpen] = useState(false)
  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Đăng Nhập</Button>
      </DialogTrigger>
      <DialogContent className="w-96 sm:w-full">
        <DialogHeader>
          <DialogTitle hidden>Edit profile</DialogTitle>
          <DialogDescription hidden>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogHeader>
          <DialogTitle hidden >Đăng Nhập Tài Khoản</DialogTitle>
        </DialogHeader>
        <TabsDemo setOpen={setOpen} />
        <Toaster />

      </DialogContent>
    </Dialog>
  );
};

// TabsDemo component from main
const TabsDemo = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>; }) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setLoadingRegisrer] = useState(false)
  const handleLogin = async (data: UserLogin) => {
    try {
      console.log(isLoading);

      const resp = await AuthAPI.login(data);

      if (resp.status == 200 && resp.user) {
        const { user, message } = resp;
        toast.success(message);
        login({ role: user.role });
        localStorage.setItem(StorageKeys.USERDATA, JSON.stringify(user));
        setTimeout(() => {
          setOpen(false);
          window.location.href = '/';
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Tài khoản hoặc mật khẩu không đúng");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRegister = async (data: any) => {
    try {
      console.log(isRegister);

      const resp = await AuthAPI.register(data);
      if (resp) {
        if (resp.status == 201) {
          toast.success("Đã tạo thài khoản thành công")
          setOpen(false);
        } else {
          toast.error("Email hoặc tài khoản đã tồn tại");
        }
      } else {
        toast.error("Email hoặc tài khoản đã tồn tại");

      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi đăng ký.");
    }
  };

  return (
    <>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">

            <motion.div
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Đăng Nhập
            </motion.div>
          </TabsTrigger>
          <TabsTrigger value="signup">

            <motion.div
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Đăng Ký
            </motion.div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <FormLogin setIsLoading={setIsLoading} onSubmit={handleLogin} />
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="signup">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >

            <Card>
              <FormRegister setIsLoading={setLoadingRegisrer} onSubmit={handleRegister} />
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export { Auth, TabsDemo, Dropdown };
