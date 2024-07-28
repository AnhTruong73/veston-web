import { createSlice } from '@reduxjs/toolkit';
import { COOKIE_KEY } from '@/web.config';

const initialState = {
  token: null,
  user: null,
  isAuth: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isAuth = false;
    },
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      localStorage.setItem(COOKIE_KEY.API_TOKEN_KEY, token);
      state.user = user;
      state.token = token;
      state.isAuth = true;
    },
    loginError: (state) => {
      state.isLoading = false;
    },
    updatePerProfile: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      // localStorage.clear();
      localStorage.removeItem(COOKIE_KEY.API_TOKEN_KEY);
      state.isLoading = false;
      state.user = null;
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginError, logout, updatePerProfile } =
  authSlice.actions;
export default authSlice.reducer;
