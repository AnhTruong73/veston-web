import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  dataSource: [],
  dataTemp: [],
  searchOption: [],
  optionSelect: [],
  detail: null,
};

export const shareholderSlice = createSlice({
  name: 'shareholder',
  initialState,
  reducers: {
    getListRequest: (state, action) => {
      state.dataSource = [];
      state.detail = null;
      state.isLoading = action.payload;
    },
    getListRequestSuccess: (state, action) => {
      state.dataSource = action.payload;
      state.detail = null;
      state.isLoading = false;
    },
    getListRequestError: (state) => {
      state.isLoading = false;
    },
    refreshShareholder: (state) => {
      state.dataSource = [];
      state.detail = null;
      state.optionSelect = [];
    },
    setItemDetailRequest: (state, action) => {
      state.detail = action.payload;
    },

    // Handle Detail Shareholder
    setSearchOption: (state, action) => {
      state.searchOption = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setItemDetailRequestSuccess: (state, action) => {
      state.dataSource.push(action.payload);
      state.isLoading = false;
      state.detail = null;
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
  setLoading,
  refreshShareholder,
  setSearchOption,
  setItemDetailRequest,
  setItemDetailRequestSuccess,
  setUpdateDetailRequestSuccess,
  flagSet,
} = shareholderSlice.actions;
export default shareholderSlice.reducer;
