import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  author: '',
  body: '',
  createdDate: '',
  createdTime: '',
  likedBy: [],
  dislikedBy: [],
  comments: [],
  tags: [],
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setQuote: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearQuote: () => initialState
  }
});

export const { setQuote, clearQuote } = quoteSlice.actions;

export default quoteSlice.reducer;
