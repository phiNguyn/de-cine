import { useState } from "react";
import { useNavigate } from "react-router-dom";
export interface User {
  role : string
}
const useAuth = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Handle null case
  });
  const navigate = useNavigate()

  const login = (user : User) => {
    user = { ...user, role: user.role };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate('/admin/login')
    setUser(null); // Set user to null instead of an empty object
  };

  return { user, login, logout };
};

export default useAuth;
