import axiosClient from '@/axios/apiConfig';
import { API_URL_CATEGORY } from '@/constant/apiConstant';

const url = API_URL_CATEGORY;
const categoryApi = {
  getAllCategories: () => {
    return axiosClient.get(url);
  },
  getBaseCategories: () => {
    return axiosClient.get(`${url}/base-categories`);
  },
};

export default categoryApi;
