import axios from '@/utils/request';

const prefix = '/resource/goodinvoice';

export const insertGoodInvoiceMaster = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/insertgoodinvoicemaster`,
    data,
  });
};

export const updateGoodInvoiceMaster = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/updategoodinvoicemaster`,
    data,
  });
};

export const searchGoodInvoiceMaster = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchgoodinvoicemaster`,
    data,
  });
};

export const searchGoodInvoiceMasterList = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchgoodinvoicemasterlist`,
    data,
  });
};

export const rejectGoodInvoice = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/rejectgoodinvoice`,
    data,
  });
};
export const insertGoodInvoiceDetail = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/insertgoodinvoicedetail`,
    data,
  });
};

export const confirmGoodInvoice = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/confirmgoodinvoice`,
    data,
  });
};

export const deleteCostcode = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/deletecostcode`,
    data,
  });
};
