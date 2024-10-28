import  { useState } from 'react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Dương Đỗ Bình',
    email: 'dobinhduong1705@gmail.com',
    gender: 'Nam',
    phone: '0338 657 685',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row bg-grayz-100 p-8 rounded-lg shadow-lg m-5">
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
            <li className='text-black' >Ưu đãi của bạn</li>
            <li className="text-red-500">Đăng xuất</li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:w-3/4 p-4 bg-white rounded-lg shadow-md lg:ml-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Thông tin tài khoản</h2>
          <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500">Chỉnh sửa</button>
        </div>
        <form className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
              <input 
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`text-black mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${isEditing ? 'focus:ring-blue-500 border-gray-300' : 'bg-gray-100 cursor-not-allowed '}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={` text-black mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${isEditing ? 'focus:ring-blue-500 border-gray-300' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Giới tính</label>
            <div className="flex items-center mt-1">
              <label className="mr-4  text-black">
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={userInfo.gender === 'Nam'}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mr-2"
                />
                Nam
              </label>
              <label className="mr-4  text-black">
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={userInfo.gender === 'Nữ'}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mr-2"
                />
                Nữ
              </label>
              <label className=' text-black'>
                <input
                  type="radio"
                  name="gender"
                  value="Khác"
                  checked={userInfo.gender === 'Khác'}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mr-2"
                />
                Khác
              </label>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`text-black mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${isEditing ? 'focus:ring-blue-500 border-gray-300' : 'bg-gray-100 cursor-not-allowed'}`}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              value="******"
              disabled
              className=" text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>
        </form>

        

        <div className="mt-8">
          <p className="mt-4 text-red-500 cursor-pointer">Xóa tài khoản</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
