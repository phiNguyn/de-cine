import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks";
import { ReactNode } from "react";

interface RequireAuthProps {
  children?: ReactNode;
  roles: string[]; // Changed to string[] for array of roles
}

const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const auth = useAuth();

  // Kiểm tra xem người dùng có đăng nhập không
  if (!auth.user) {
    return <Navigate to="/" />;
  }

  // Kiểm tra xem vai trò của người dùng có trong danh sách vai trò cho phép không
  const isAllowed = roles.includes(auth.user?.role);
  if (isAllowed) {
    return <>{children}</>; // Bọc children trong một fragment
  }

  // Nếu không có quyền, chuyển hướng về trang chính
  return <Navigate to="/" />;
};

export default RequireAuth;
