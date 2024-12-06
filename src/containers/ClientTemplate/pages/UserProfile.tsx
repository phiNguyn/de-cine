import { UserAPI } from '@/apis/user';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AccountInfo from '../component/UserProfile';
const UserProfile = () => {
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const response = await UserAPI.userDetail(userData.id_account);
        setUser(response);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
    fetchUserDetails();
  }, []);




  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          [name]: value,
        };
      }
      return null;
    });
  };

  const handleSave = async () => {
    if (user) {
      try {
        const updatedUser = {
          full_name: user.full_name,
          phone: user.phone,
        };

        await UserAPI.updateUser(user.id_account, updatedUser);
        console.log("User updated successfully");
        toast.success("Cập nhật thông tin thành công!");
        setIsEditing(false);

      } catch (error) {
        console.error("Error updating user", error);
        toast.error("Đã xảy ra lỗi khi cập nhật thông tin.");

      }
    }
  };
  const isAccountPage = location.pathname === '/UserProfile';
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-y-10 xl:gap-y-0 gap-x-0 xl:gap-x-10  p-8 rounded-lg shadow-lg m-5">
      {/* Sidebar */}
      <div className="col-span-1 h-fit  p-4 bg-primary rounded-lg shadow-md">

        <div className="">
          <ul className="space-y-4">
            <li className={isAccountPage ? "font-black " : ""}>
              <Link to="" className="text-primary-foreground w-full">Tài khoản</Link> {/* Link đến trang Vé của bạn */}
            </li>
            <li className={location.pathname.includes('/UserProfile/tickets') ? "font-black " : ""}>
              <Link to="tickets" className="text-primary-foreground w-full">Vé của bạn</Link>
            </li>
            {/* <li className={location.pathname.includes('/profile/promotions') ? "font-semibold text-blue-500" : ""}>
              <Link to="promotions" className="text-black">Ưu đãi của bạn</Link>
            </li> */}
          </ul>
        </div>
      </div>
      {isAccountPage ? (
        <AccountInfo
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          user={user}
        />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default UserProfile;
