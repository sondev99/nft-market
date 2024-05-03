import axiosClient from '@/axios/apiConfig';
import { API_URL_CHECKOUT } from '@/constant/apiConstant';

const url = API_URL_CHECKOUT;
const checkoutApi = {
  checkout: (data: CheckoutRequest) => {
    return axiosClient.post(`${url}`, data);
  },
};

export default checkoutApi;
