import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSaved: false,
  dataSource: [],
  master: null,
  costcode: null,
};

export const goodInvoiceDetailSlice = createSlice({
  name: 'goodinvoicedetail',
  initialState,
  reducers: {
    getListRequest: (state, action) => {
      state.dataSource = [];
      state.master = null;
      state.costcode = null;
      state.isSaved = false;
      state.isLoading = action.payload;
    },
    getListRequestSuccess: (state, action) => {
      state.dataSource = action.payload;
      state.isSaved = true;
      state.isLoading = false;
    },
    getMasterInsertSuccess: (state, action) => {
      state.master = action.payload;
      state.isLoading = false;
      state.isSaved = true;
    },
    getListRequestError: (state) => {
      state.isLoading = false;
    },
    refreshGoodInvoiceDetail: (state) => {
      state.dataSource = [];
      state.master = null;
      state.costcode = null;
      state.isLoading = false;
      state.isSaved = false;
    },
    setDetailInsertSuccess: (state, action) => {
      state.dataSource = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
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
  refreshGoodInvoiceDetail,
  setLoading,
  getMasterInsertSuccess,
  setDetailInsertSuccess,
  setCostcodeRequest,
} = goodInvoiceDetailSlice.actions;
export default goodInvoiceDetailSlice.reducer;
