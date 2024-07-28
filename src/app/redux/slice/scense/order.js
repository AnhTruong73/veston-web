import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  dataSource: [],
  detail: null,
  paramSearch: null,
  SewDetail: null,
  flagDone: null,
};

export const orderSlice = createSlice({
  name: 'order',
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

    getParamSearch: (state, action) => {
      state.paramSearch = action.payload;
    },

    refreshOrder: (state) => {
      state.dataSource = [];
      state.detail = null;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setItemDetailRequest: (state, action) => {
      state.detail = action.payload;
    },

    setItemDetailRequestSuccess: (state, action) => {
      state.dataSource.push(action.payload);
      state.isLoading = false;
      state.detail = action.payload;
    },
    setSewingDetail: (state, action) => {
      state.SewDetail = action.payload;
    },
    setUpdateDetailRequestSuccess: (state, action) => {
      state.dataSource = action.payload;
      state.detail = null;
      state.isLoading = false;
    },
    setDone: (state, action) => {
      state.flagDone = action.payload;
    }
  },
});

export const {
  getListRequest,
  getListRequestSuccess,
  getListRequestError,
  getParamSearch,
  setItemDetailRequest,
  refreshOrder,
  setLoading,
  setSewingDetail,
  setItemDetailRequestSuccess,
  setUpdateDetailRequestSuccess,
  setDone
} = orderSlice.actions;
export default orderSlice.reducer;
