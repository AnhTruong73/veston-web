import axios from '@/utils/request';
const prefix = '/resource/costcode';

export const searchCostCodeDetail = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchcostcodedetail`,
    data,
  });
};
