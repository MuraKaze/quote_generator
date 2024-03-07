import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: uuidv4(), // Generate UUID for the new user
      };
      state.push(newUser);
    },
    addUserBySeed: (state, action) => {
      state.splice(0); // Clear existing quotes
      const users = action.payload.map(quote => ({
        ...quote,
      }));
      state.push(...users);
    },
    getUser: (state, action) => {
      const userId = action.payload;
      return state.find(user => user.id === userId);
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      return state.filter(user => user.id !== userId);
    },
    editUser: (state, action) => {
      const { id, ...updatedUser } = action.payload;
      const existingUser = state.find(user => user.id === id);
      if (existingUser) {
        Object.assign(existingUser, updatedUser);
      }
    },
  }
});

export const { addUser, getUser, deleteUser, editUser, addUserBySeed } = usersSlice.actions;

export default usersSlice.reducer;
