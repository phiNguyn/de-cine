import React from 'react';
import { User } from '@/types/user';

interface UserTableProps {
  user: User;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserTable: React.FC<UserTableProps> = ({ user, isEditing, handleInputChange }) => {
  return (
    <form className="mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">User Name</label>
          <input
            type="text"
            name="user_name"
            value={user.user_name}
            disabled
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed "
            
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            disabled
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Họ và tên đầy đủ</label>
        <input
          type="text"
          name="full_name"
          value={user.full_name}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`text-black mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            isEditing ? 'focus:ring-blue-500 border-gray-300' : 'bg-gray-100 cursor-not-allowed'
          }`}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`text-black mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            isEditing ? 'focus:ring-blue-500 border-gray-300' : 'bg-gray-100 cursor-not-allowed'
          }`}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Điểm tích lũy</label>
        <input
          type="number"
          name="loyalty_points"
          value={user.loyalty_points ?? 0}
          disabled
          className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
        <input
          type="password"
          value="******"
          disabled
          className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
        />
      </div>
    </form>
  );
};

export default UserTable;
