import axiosClient from "@/axios/apiConfig";
import { API_URL_REVIEW } from "@/constant/apiConstant";

const url = API_URL_REVIEW;

const reviewApi = {
  createReview: (review: ReviewRequest) => {
    return axiosClient.post(`${url}`, review);
  },
};

export default reviewApi;
