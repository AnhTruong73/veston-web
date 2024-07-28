import axios from '@/utils/request';
const prefix = '/resource/material';

export const searchMaterial = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchmaterial`,
    data,
  });
};
