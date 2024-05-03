import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const { response, config } = error;
    const status = response?.status;
    if (
      status === 401 &&
      Cookies.get('refreshToken') &&
      response.data.message ===
        'The access token provided is expired, revoked, malformed, or invalid for other reasons.'
    ) {
      const refreshTokenLocal = Cookies.get('refreshToken');
      try {
        const { accessToken, refreshToken } = (
          await axiosClient.post(`api/v1/auth-service/auth/refresh-token`, {
            refreshToken: refreshTokenLocal,
          })
        ).data;

        console.log('res', accessToken);

        Cookies.set('accessToken', accessToken, { expires: 100 });
        Cookies.set('refreshToken', refreshToken, { expires: 100 });

        config.headers['Authorization'] = `Bearer ${accessToken}`;

        return Promise.resolve(axiosClient.request(config));
      } catch (error) {
        return Promise.reject(error);
      }
    }
    // Handle errors
    // return Promise.reject(error);
    return error.response;
  }
);

export default axiosClient;

// const axiosClient = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_URL,
//   headers: {
//     'content-type': 'application/json'
//   },
//   paramsSerializer: (params) => queryString.stringify(params)
// })

// axiosClient.interceptors.request.use(async (config) => {
//   const access_token = JSON.parse(localStorage?.getItem('userStore') || '{}')?.state?.access_token
//   if (access_token) {
//     config.headers.Authorization = `Bearer ${access_token}`
//   }
//   return config
// })
// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data
//     }
//     return response
//   },
//   (error) => {
//     console.log(error)
//     // return error.response.data
//   }
// )
// export default axiosClient
