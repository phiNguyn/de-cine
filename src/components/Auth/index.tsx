import { Button } from "@/components/ui/button";
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
}

export { Auth, TabsDemo };
