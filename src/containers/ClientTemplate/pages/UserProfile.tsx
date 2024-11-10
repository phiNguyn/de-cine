import { UserAPI } from '@/apis/user';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';
import UserTable from '../component/UserProfileTable';
import toast from 'react-hot-toast';

const UserProfile = () => {
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

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-8 rounded-lg shadow-lg m-5">
      {/* Sidebar */}
      <div className="lg:w-1/4 p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
          <p className="font-semibold text-lg text-black">0338 657 685</p>
        </div>
        <div className="mt-8">
          <ul className="space-y-4">
            <li className="font-semibold text-blue-500">Tài khoản</li>
            <li className='text-black'>Vé của bạn</li>
            <li className='text-black'>Ưu đãi của bạn</li>
            <li className="text-red-500">Đăng xuất</li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:w-3/4 p-4 bg-white rounded-lg shadow-md lg:ml-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Thông tin tài khoản</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-500"
          >
            {isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa'}
          </button>
        </div>
        {user && (
          <>
            <UserTable
              user={user}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            <input
              type="hidden"
              name="id_account"
              value={user.id_account}
            />
          </>
        )}
        <button
          onClick={handleSave}
          className='mt-4 px-6 py-3 rounded-md text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
          disabled={!isEditing}
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
