import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSaved: false,
  dataSource: [],
  master: null,
  costcode: null,
  dataSourceDetail: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getListRequest: (state, action) => {
      state.dataSource = [];
      state.detail = null;
      state.isLoading = action.payload;
    },
    getListRequestSuccess: (state, action) => {
      state.dataSource = action.payload;
      state.isLoading = false;
    },
    getListRequestError: (state) => {
      state.isLoading = false;
    },
    refreshProductDetail: (state) => {
      state.dataSource = [];
      state.master = null;
      state.costcode = null;
      state.isLoading = false;
      state.isSaved = false;
      state.dataSourceDetail = [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setItemDetailRequest: (state, action) => {
      state.detail = action.payload;
    },

    setUpdateDetailRequestSuccess: (state, action) => {
      state.dataSourceDetail = action.payload;
      state.costcode = null;
      state.isLoading = false;
    },
    setDetailInsertSuccess: (state, action) => {
      state.dataSourceDetail = action.payload;
      state.costcode = null;
      state.isLoading = false;
    },
    getMasterInsertSuccess: (state, action) => {
      state.master = action.payload;
      state.isLoading = false;
      state.isSaved = true;
      state.dataSourceDetail = action.payload.ProductDetail;
    },
    setCostcodeRequest: (state, action) => {
      state.costcode = action.payload;
    },
  },
});

export const {
  getListRequest,
  getListRequestSuccess,
  getListRequestError,
  setItemDetailRequest,
  refreshProductDetail,
  setLoading,
  setCostcodeRequest,
  getMasterInsertSuccess,
  setDetailInsertSuccess,
  setUpdateDetailRequestSuccess,
} = productSlice.actions;
export default productSlice.reducer;
