import axiosClient from '@/axios/apiConfig';
import { API_URL_PRODUCT } from '@/constant/apiConstant';

const url = API_URL_PRODUCT;

interface paramsPops {
  categoryId?: string;
  brandId?: string;
  searchText?: string | '';
  offset?: number;
  pageSize?: number;
  sortStr?: string | '';
}

const productApi = {
  getProductByCategory: (categoryId: string | null) => {
    return axiosClient.get(`${url}/filter-by-cat?category=${categoryId}`);
  },
  getById: (id: string | undefined) => {
    return axiosClient.get(`${url}/${id}`);
  },
  getByConditionAndPagination: (params: paramsPops) => {
    return axiosClient.get(url, {
      params,
    });
  },
};

export default productApi;
