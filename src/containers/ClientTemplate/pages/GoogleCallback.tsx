import axiosClient from "@/apis/axiosClient";
import Loader from "@/components/loader";
import { StorageKeys } from "@/constants/StorageKeys";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const GoogleCallback = () => {
    const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    // Lấy mã xác thực từ URL
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    useEffect(() => {
        const fetchTokens = async (code: string) => {
            setIsLoading(true);
            try {
                // Gửi mã xác thực đến backend để nhận token
                const response = await axiosClient.get(`/google-callback?code=${code}`);
                if (response.status === 201) {
                    const { data, status } = response.data;
                    localStorage.setItem(StorageKeys.USERDATA, JSON.stringify(data));
                    login({ role: data.role });
                    toast.success(status);
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error('Error fetching tokens:', error);
                toast.error(error.response?.data?.status || 'Đã xảy ra lỗi!');
            } finally {
                setIsLoading(false);
            }
        };
        if (code) {
            fetchTokens(code);
        }
    }, [code]); // Chỉ chạy khi isFetched thay đổi

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="h-[80vh]"><Toaster /></div>
            )}
        </>
    );
};

export default GoogleCallback;
