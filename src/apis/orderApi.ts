import axiosClient from '@/axios/apiConfig';
import { API_URL_ORDER } from '@/constant/apiConstant';

const url = API_URL_ORDER;
const orderApi = {
  createOrder: (data: OrderRequest) => {
    return axiosClient.post(`${url}`, data);
  },
  getOrderOfCurrentUser: () => {
    return axiosClient.get(`${url}/current`);
  },

  getOrderById: (id: string | undefined) => {
    return axiosClient.get(`${url}/${id}`);
  },
};

export default orderApi;
