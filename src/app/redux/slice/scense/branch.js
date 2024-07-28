import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  dataSource: [],
  searchOption: [],
  detail: null,
};

export const branchSlice = createSlice({
  name: 'branch',
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
      state.detail = null;
    },
    getListRequestError: (state) => {
      state.isLoading = false;
    },
    refreshBranch: (state) => {
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
      state.detail = null;
    },
    setUpdateDetailRequestSuccess: (state, action) => {
      state.dataSource = action.payload;
      state.detail = null;
      state.isLoading = false;
    },
    setSearchOption: (state, action) => {
      state.searchOption = action.payload;

    }
  },
});

export const {
  getListRequest,
  getListRequestSuccess,
  getListRequestError,
  setItemDetailRequest,
  refreshBranch,
  setLoading,
  setItemDetailRequestSuccess,
  setUpdateDetailRequestSuccess,
  setSearchOption
} = branchSlice.actions;
export default branchSlice.reducer;
