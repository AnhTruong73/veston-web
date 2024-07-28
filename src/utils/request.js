import axios, { CancelToken } from 'axios';
// import Cookies from 'js-cookie';
// import { CANCEL } from 'redux-saga';
import { WS_API, COOKIE_KEY } from '../web.config';

const instance = axios.create({
  baseURL: WS_API,
  timeout: 300000,
  //transformRequest: [(data) => JSON.stringify(data)],
  source: '/api/:path*',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,

    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  validateStatus: (status) => {
    return true; // I'm always returning true, you may want to do it depending on the status received
  },
});
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem(COOKIE_KEY.API_TOKEN_KEY);
    // const token = Cookies.get('ws_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// remove field null
const clean = (obj) => {
  if (!obj) {
    return obj;
  }
  let data = { ...obj };
  for (var propName in data) {
    if (data[propName] === null || data[propName] === undefined) {
      delete data[propName];
    }
  }
  return JSON.stringify(data) === '{}' ? null : data;
};

const axiosRequest = (options) => {
  const data = clean(options.data);
  const params = clean(options.params);
  const source = CancelToken.source();
  const promise = new Promise((resolve, reject) => {
    instance({
      ...options,
      data,
      params,
      cancelToken: source.token,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (
          error.code === 'ECONNABORTED' &&
          error.message.includes('timeout')
        ) {
          alert('Request timeout!, please contact to IT!');
        }
        reject(error);
      });
  });
  // promise[CANCEL] = () => source.cancel();
  return promise;
};

export const multipart = (url, form_data) => {
  const source = CancelToken.source();
  const promise = new Promise((resolve, reject) => {
    instance
      .post(url, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => resolve(response.data))
      .catch((error) => {
        throw error;
      });
  });
  // promise[CANCEL] = () => source.cancel();
  return promise;
};

export default axiosRequest;
