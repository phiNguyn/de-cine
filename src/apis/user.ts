/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";
import { ProfileFormValues } from "@/containers/AdminTemplate/pages/Account/component/AddAcount";
export const UserAPI = {
  userDetail: async (id: number | undefined) => {
    try {
      const resp = await axiosClient.get(`/${API_URL.accounts}/${id}`);

      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
  getAllUsers: async () => {
    try {
      const resp = await axiosClient.get(`/${API_URL.accounts}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (id: number, data: any) => {
    try {
      const resp = await axiosClient.put(`/${API_URL.accounts}/${id}`, data);
      return resp;
    } catch (error) {
      console.log(error);
    }
  },
  addUser: async (data: ProfileFormValues) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.register}`, data);
      return resp;
    } catch (err) {
      console.log(err);
    }
  },
};
