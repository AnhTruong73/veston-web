import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  dataSource: [],
  detail: null,
  isNeedSearch: false,
};

export const goodInvoiceSlice = createSlice({
  name: 'goodinvoice',
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
    refreshGoodInvoice: (state) => {
      state.dataSource = [];
      state.detail = null;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNeedSearch: (state, action) => {
      state.isNeedSearch = action.payload;
    },
    setItemDetailRequest: (state, action) => {
      state.detail = action.payload;
    },

    setItemDetailRequestSuccess: (state, action) => {
      state.dataSource.push(action.payload);
      state.isLoading = false;
      state.detail = action.payload;
    },
    setUpdateDetailRequestSuccess: (state, action) => {
      state.dataSource = action.payload;
      state.detail = null;
      state.isLoading = false;
    },
  },
});

export const {
  getListRequest,
  getListRequestSuccess,
  getListRequestError,
  setItemDetailRequest,
  refreshGoodInvoice,
  setLoading,
  setItemDetailRequestSuccess,
  setUpdateDetailRequestSuccess,
  setNeedSearch,
} = goodInvoiceSlice.actions;
export default goodInvoiceSlice.reducer;
