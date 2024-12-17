import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
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
import { ForGotPass } from './ForgotPass';
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
          <DropdownMenuLabel onClick={() => setTheme("light")}>Giao diện sáng</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setTheme("dark")}>Giao diện tối</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// Auth component from main
const Auth = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const handleForgotPasswordClick = () => {
    setShowLoginModal(false)
    setShowForgotPasswordModal(true)
  }
  return (
    <>
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
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
          <TabsDemo setOpen={setShowLoginModal} />
          <Button onClick={handleForgotPasswordClick} variant={"link"} size={"default"}>Quên mật khẩu</Button>
        </DialogContent>
        <Toaster />
      </Dialog>

      <Dialog open={showForgotPasswordModal} onOpenChange={setShowForgotPasswordModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader >
            <DialogTitle className="text-center" >Quên mật khẩu</DialogTitle>
            <DialogDescription  className="text-center">
              Chúng tôi sẽ gửi email cho bạn về việc xác thực đổi mật khẩu
            </DialogDescription>
          </DialogHeader>
          <DialogHeader>
            <DialogTitle hidden >Đăng Nhập Tài Khoản</DialogTitle>
          </DialogHeader>
          <ForGotPass />
        </DialogContent>
      </Dialog>
    </>
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
        const { user, message, access_token, refresh_token } = resp;
        toast.success(message);
        login({ role: user.role });
        localStorage.setItem(StorageKeys.USERDATA, JSON.stringify(user));
        localStorage.setItem(StorageKeys.ACCESS_TOKEN, access_token)
        localStorage.setItem(StorageKeys.REFRESH_TOKEN, refresh_token)
        setOpen(false);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { message } = error.response.data
      toast.error(message);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRegister = async (data: any) => {
    try {
      console.log(isRegister);

      const resp = await AuthAPI.register(data);
      if (resp?.status == 201) {
        toast.success(resp.message)
        setOpen(false);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { data } = error.response
      if (data) {
        if (data.user_name && data.email) {
          toast.error("Tên đăng nhập và email đã được sử dụng")
        } else {
          toast.error(data.user_name ? "Tên đăng nhập đã được sử dụng" : "Email đã được sử dụng")
        }
        // toast.error(data.user_name[0])
      }
    }
  };

  return (
    <>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
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
