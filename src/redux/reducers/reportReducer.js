import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = []

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    addReport: (state, action) => {
      const createdDateTime = new Date().toISOString().split('T');
      const newReport = {
        ...action.payload,
        id: uuidv4(),
        createdDate: createdDateTime[0],
        createdTime: createdDateTime[1],
      }
      state.push(newReport)
    }
  }
});

export const { addReport } = reportSlice.actions;

export default reportSlice.reducer;
