import { API_URL } from "@/constants/api";
import axios from "axios";

// Tạo instance axios
const axiosClient = axios.create({
  baseURL: API_URL.url,
  headers: {
    "Content-Type": "application/json", // Đặt content-type mặc định
  },
  timeout: 10000, // Thời gian chờ cho mỗi yêu cầu (10 giây)
});

// Interceptor cho request để thêm token (nếu cần)
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage hoặc bất kỳ phương pháp lưu trữ nào
    const token = localStorage.getItem("token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header Authorization
    }
    
    return config;
  },
  (error) => {
    // Xử lý lỗi trước khi gửi request
    return Promise.reject(error);
  }
);

// Interceptor cho response để xử lý kết quả hoặc lỗi
axiosClient.interceptors.response.use(
  (response) => {
    // Xử lý response thành công
    return response; // Trả về dữ liệu đã xử lý
  },
  (error) => {
    // Xử lý response lỗi
    if (error.response) {
      const {data} = error.response
      if(error.response.status == 402) {
        // console.log(data);
        
        return data
      }
      // Xử lý lỗi từ phía server (4xx, 5xx)
      // console.error("API Error: ", error.response.data.message || error.message);
    } else if (error.request) {
      // Không nhận được phản hồi từ server
      console.error("No response from server.");
    } else {
      // Lỗi khác khi thiết lập request
      console.error("Axios error: ", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
