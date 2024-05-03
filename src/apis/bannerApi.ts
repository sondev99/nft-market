import axiosClient from '@/axios/apiConfig';
import { API_URL_BANNER } from '@/constant/apiConstant';

const url = API_URL_BANNER;
const bannerApi = {
  getAllBanners: () => {
    return axiosClient.get(`${url}/all`);
  },
};

export default bannerApi;
