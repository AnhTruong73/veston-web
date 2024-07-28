import axios from '@/utils/request';

const prefix = '/resource/employee';

export const insertEmployee = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/insertemployee`,
    data,
  });
};

export const searchEmployee = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchemployee`,
    data,
  });
};

export const updateEmployee = (data) => {
  return axios({
    method: "POST",
    url: `${prefix}/updateemployee`,
    data
  });
}

export const updateProfile = (data) => {
  return axios({
    method: "POST",
    url: `${prefix}/updateprofile`,
    data
  });
}

export const deleteEmployee = (data) => {
  return axios({
    method: "POST",
    url: `${prefix}/deleteemployee`,
    data
  });
}
