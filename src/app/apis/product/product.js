import axios from '@/utils/request';

const prefix = '/resource/product';

export const searchProductList = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchproductlist`,
    data,
  });
};

export const insertProductMaster = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/insertproductmaster`,
    data,
  });
};

export const searchProductMaster = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchproductmaster`,
    data,
  });
};

export const updateProductMaster = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/updateproductmaster`,
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

export const insertCostcode = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/insertcostcode`,
    data,
  });
};
