import { useState } from 'react';
import UserTable from '../UserProfileTable';
import { User } from '@/types/user';

interface AccountInfoProps {
    user?: User | null;
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSave?: () => void;
    isEditing?: boolean;
    setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;  // Để có thể thay đổi trạng thái chỉnh sửa
}

const AccountInfo = ({ user, handleInputChange, handleSave }: AccountInfoProps) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="col-span-1 xl:col-span-3 p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Thông tin tài khoản</h2>
                <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
            </div>
            {user && (
                <>
                    <UserTable user={user} isEditing={isEditing} handleInputChange={handleInputChange} />
                    <input type="hidden" name="id_account" value={user.id_account} />
                </>
            )}
            <SaveButton isEditing={isEditing} handleSave={handleSave} />
        </div>
    );
};

export default AccountInfo;


export const SaveButton = ({ isEditing, handleSave }: { isEditing: boolean; handleSave?: () => void; }) => {
    return (
        <button
            onClick={handleSave}
            className="mt-4 px-6 py-3 rounded-md text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            disabled={!isEditing}
        >
            Cập nhật
        </button>
    );
};


export const EditButton = ({ isEditing, setIsEditing }: {
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-500"
        >
            {isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa'}
        </button>
    );
};

