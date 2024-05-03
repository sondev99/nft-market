import axiosClient from '@/axios/apiConfig';
import { API_URL_USER } from '@/constant/apiConstant';

const url = API_URL_USER;
const userApi = {
  getCurrentUser: () => {
    return axiosClient.get(`${url}/current`);
  },
  getUserById: (id: string | undefined) => {
    return axiosClient.get(`${url}/${id}`);
  },
};

export default userApi;
