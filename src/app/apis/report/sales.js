import axios from '@/utils/request';

const prefix = '/sales';

export const getSale = (type) => {
  return axios({
    method: 'GET',
    url: `${prefix}/${type}`,
  });
};

export const searchDashboardRow = () => {
  return axios({
    method: 'GET',
    url: `${prefix}/dashboard-data`,
  });
};
