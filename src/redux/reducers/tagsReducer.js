import { createSlice } from '@reduxjs/toolkit';
const initialState =
[
  "Love",
  "Inspirational",
  "Motivational",
  "Success",
  "Happiness",
  "Friendship",
  "Life",
  "Wisdom",
  "Courage",
  "Hope",
  "Dreams",
  "Creativity",
  "Gratitude",
  "Positivity",
  "Change"
]

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action) => {
      const newTag = action.payload
      state.push(newTag)
    },
    deleteTag: (state, action) => {
      const deletedTag = action.payload;
      return state.filter(tag => tag !== deletedTag)
    }
  }
})

export const { addTag, deleteTag } = tagsSlice.actions;

export default tagsSlice.reducer;
