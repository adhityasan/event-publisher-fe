/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios';

import localStorage from './utils/localStorage';

const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

const onFulFilledRequest = (conf: AxiosRequestConfig) => {
  const authToken = localStorage.accessToken.get();
  if (authToken) conf.headers.Authorization = `Bearer ${authToken}`;
  if (!conf.headers['Content-Type']) conf.headers['Content-Type'] = 'application/json; charset=utf-8';
  return conf;
};

const onRejectedRequest = (err: any) => Promise.reject(err);

const onFulFilledResponse = (res: any) => Promise.resolve(res);

const onRejectedResponse = (err: any) => {
  if (err?.response?.data) {
    return Promise.reject(err.response.data);
  }
  Promise.reject(err);
};

axiosInstance.interceptors.request.use(onFulFilledRequest, onRejectedRequest);
axiosInstance.interceptors.response.use(onFulFilledResponse, onRejectedResponse);

export default axiosInstance;
