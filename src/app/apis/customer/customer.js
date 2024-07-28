import axios from '@/utils/request';

const prefix = '/resource/customer';

export const insertCustomer = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/insertcustomer`,
    data,
  });
};

export const searchCustomer = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchcustomer`,
    data,
  });
};

export const updateCustomer= (data) => {
  return axios({
    method: "POST",
    url: `${prefix}/updatecustomer`,
    data
  });
}

export const deleteCustomer= (data) => {
  return axios({
    method: "POST",
    url: `${prefix}/deletecustomer`,
    data
  });
}
