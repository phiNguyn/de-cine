import { useState } from "react";
export interface User {
  role : string
}
const useAuth = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Handle null case
  });

  const login = (user : User) => {
    user = { ...user, role: user.role };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null); // Set user to null instead of an empty object
  };

  return { user, login, logout };
};

export default useAuth;
