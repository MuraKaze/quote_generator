import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: 'admin@quote.com',
  password: '12345',
  isLoggedIn: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logInAsAdmin: (state) => {
      return { ...state, isLoggedIn: true };
    },
    logOutAsAdmin: (state) => {
      return { ...state, isLoggedIn: false };
    },
  },
});

export const { logInAsAdmin, logOutAsAdmin } = adminSlice.actions;

export default adminSlice.reducer;
