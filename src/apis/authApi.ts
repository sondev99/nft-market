import { API_URL_AUTH } from '@/constant/apiConstant';
import axiosClient from '@/axios/apiConfig';

const url = API_URL_AUTH;
const authApi = {
  activeAccount: (token: string | undefined) => {
    return axiosClient.post(`${url}/active-user/${token}`);
  },
  register: (data: any) => {
    return axiosClient.post(`${url}/register`, data);
  },
  login: (data: LoginResquest) => {
    return axiosClient.post(`${url}/login`, data);
  },
  loginWithFacebook: (data: SocialLoginResquest) => {
    const url = `${API_URL_AUTH}/login/facebook`;
    return axiosClient.post(url, data);
  },
};

export default authApi;
