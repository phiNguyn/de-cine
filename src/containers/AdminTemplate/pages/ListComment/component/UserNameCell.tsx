import { UserAPI } from "@/apis/user";
import { useState, useEffect } from "react";

interface UserNameCellProps {
  idAccount: string;
}

const UserNameCell = ({ idAccount }: UserNameCellProps) => {
  const [userName, setUserName] = useState<string>("Đang tải...");

  useEffect(() => {
    const fetchUserName = async (idAccount:number) => {
      try {
        const userDetail = await UserAPI.userDetail(idAccount);
        if (userDetail) {
          setUserName(userDetail.full_name);
        }
      } catch (error) {
        console.error("Lỗi khi lấy full_name:", error);
        setUserName("Không xác định");
      }
    };

    fetchUserName(Number(idAccount));
  }, [idAccount]);

  return <div>{userName}</div>;
};

export default UserNameCell;
