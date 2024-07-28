import axios from '@/utils/request';

const prefix = '/resource/account';


export const searchAccount = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchaccount`,
    data,
  });
};

export const searchUser = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchuser`,
    data,
  });
};

export const insertAccount = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/insertaccount`,
    data,
  });
};

export const updateAccount = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/updateaccount`,
    data,
  });
};


