import axios from '@/utils/request';

const prefix = '/resource/branch';

export const searchBranch = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchbranch`,
    data,
  });
};

export const updateBranch = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/updatebranch`,
    data,
  });
};

export const insertBranch = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/insertbranch`,
    data,
  });
};
export const deleteBranch = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/deletebranch`,
    data,
  });
};

export const searchNameArea = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchnamearea`,
    data,
  });
};

export const searchNameBranch = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchnamebranch`,
    data,
  });
};
