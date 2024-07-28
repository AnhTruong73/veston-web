import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  dataSource: [],
  dataTemp: [],
  optionSelect: [],
  detail: null,
  flags: 3,
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    getListRequest: (state, action) => {
      state.dataSource = [];
      state.detail = null;
      state.isLoading = action.payload;
    },
    flagSet: (state, action) => {
      state.flags = action.payload;
    },
    getListRequestSuccess: (state, action) => {
      state.dataSource = action.payload;
      state.isLoading = false;
    },
    getListRequestError: (state) => {
      state.isLoading = false;
    },
    refreshcustomer: (state) => {
      state.dataSource = [];
      state.detail = null;
      state.optionSelect = [];
    },
    refreshFormCT: (state) => {
      state.detail = null;
    },
    setItemDetailRequest: (state, action) => {
      state.detail = action.payload;
    },

    // Handle Detail customer
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setItemDetailRequestSuccess: (state, action) => {
      state.dataSource.push(action.payload);
      state.isLoading = false;
      state.detail = null;
    },
    setUpdateDetailRequestSuccess: (state, action) => {
      state.dataSource.push(action.payload);
      state.detail = null;
      state.isLoading = false;
    },
  },
});

export const {
  getListRequest,
  getListRequestSuccess,
  getListRequestError,
  setLoading,
  refreshcustomer,
  setItemDetailRequest,
  setItemDetailRequestSuccess,
  setUpdateDetailRequestSuccess,
  refreshFormCT,
  flagSet,
  putDataToUpdateRefesh,
  getDataToUpdateRefesh
} = customerSlice.actions;
export default customerSlice.reducer;
