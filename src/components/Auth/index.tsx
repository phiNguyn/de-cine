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

// Dropdown component from nguyen-home
const Dropdown = () => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="destructive">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel onClick={() => setTheme("light")}>Light</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Auth component from main
const Auth = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Đăng Nhập</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
    <Tabs defaultValue="login" className="w-[400px] pr-8">
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
