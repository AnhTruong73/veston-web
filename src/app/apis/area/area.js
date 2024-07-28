import axios from '@/utils/request';

const prefix = '/resource/branch';

export const searchArea = () => {
  return axios({
    method: 'GET',
    url: `${prefix}/searcharea`
  });
};
