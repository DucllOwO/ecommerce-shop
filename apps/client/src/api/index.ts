import { notification } from 'antd';
import axios, { AxiosResponse } from 'axios';
export const http = axios.create({
  baseURL: 'http://localhost:1205/api',
  timeout: 10000,
  headers: {
    Authorization: localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : undefined
  },
});

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    const status = error.response ? error.response.status : 0;
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : 'Hệ thống gặp sự cố, thử lại sau!!';

    if (status >= 400 && status <= 499) {
      notification.error({ message, duration: 10 });
    } else if (status >= 500 && status <= 599) {
      notification.error({
        message: 'Hệ thống gặp sự cố, thử lại sau!!',
        duration: 10
      });
    }

    return Promise.reject(error);
  }
);
