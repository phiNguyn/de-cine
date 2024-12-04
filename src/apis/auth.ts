/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";
import { ForgotPass } from "@/containers/ClientTemplate/component/Auth/ForgotPass";

export const AuthAPI = {
  login: async (data: { user_name: string; password: string }) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.login}`, data);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },

  register: async (data: any) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.register}`, data);
      return resp;
    } catch (error) {
      console.log(error);
    }
  },

  forgot: async (data: ForgotPass) => {
    try {
      const resp = await axiosClient.post(`/password-forgot`, data);
      return resp;
    } catch (error) {
      console.log(error);
    }
  },

  resetPassword: async (data: {
    token: string | null;
    password: string;
    password_confirmation: string;
  }) => {
    try {
      const resp = await axiosClient.post(`/password-reset`, data);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },

  verifyEmail: async (data: string) => {
    try {
      const resp = await axiosClient.get(`/accounts-verify/${data}`);
      return resp;
    } catch (error) {
      console.log(error);
    }
  },
};
