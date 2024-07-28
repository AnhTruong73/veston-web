import axios from '@/utils/request';

const prefix = '/resource/order';

export const insertOrderMaster = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/insertordermaster`,
    data,
  });
};

export const updateOrderMaster = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/updateordermaster`,
    data,
  });
};

export const searchOrderMaster = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchordermaster`,
    data,
  });
};

export const searchOrderMasterList = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchordermasterlist`,
    data,
  });
};

export const rejectOrder = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/rejectorder`,
    data,
  });
};

export const insertOrderDetail = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/insertorderdetail`,
    data,
  });
};

export const confirmOrder = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/confirmorder`,
    data,
  });
};

export const searchSewing = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchsewing`,
    data,
  });
};

export const searchSewingOrder = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchsewingorder`,
    data,
  });
};

export const updateStatusOrder = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/updatestatusorder`,
    data,
  });
}
  
export const updateStatusSew = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/updatestatussew`,
    data,
  });
}

export const updateSewDone = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/updatesewdone`,
    data,
  });
}

export const deleteSewing = (data) => {
  return axios({
    method: "POST",
    url: `${prefix}/deletesewing`,
    data
  });
}

export const deleteOrder = (data) => {
  return axios({
    method: "POST",
    url: `${prefix}/deleteorder`,
    data
  });
}
