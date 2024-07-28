import axios from '@/utils/request';

const prefix = '/resource/shareholder';

export const insertShareholder = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/insertshareholder`,
    data,
  });
};

export const searchShareholder = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchshareholder`,
    data,
  });
};

export const updateShareholder = (data) => {
  return axios({
    method: "POST",
    url: `${prefix}/updateshareholder`,
    data
  });
}

export const deleteShareholder = (data) => {
  return axios({
    method: "POST",
    url: `${prefix}/deleteshareholder`,
    data
  });
}
