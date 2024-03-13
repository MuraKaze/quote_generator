import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  tags: []
};

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    followTag: (state, action) => {
      const { userId, tag } = action.payload;
      const isFollowingIndex = state.tags.findIndex(entry => entry.follower === userId && entry.following === tag);
      if (isFollowingIndex === -1) {
        state.tags.push({ follower: userId, following: tag });
      } else {
        state.tags.splice(isFollowingIndex, 1);
      }
    },
    followUser: (state, action) => {
      const { followerId, followingId } = action.payload;
      const isFollowingIndex = state.users.findIndex(entry => entry.follower === followerId && entry.following === followingId);
      if (isFollowingIndex === -1) {
        state.users.push({ follower: followerId, following: followingId });
      } else {
        state.users.splice(isFollowingIndex, 1);
      }
    }
  }
});

export const { followTag, followUser } = followSlice.actions;

export default followSlice.reducer;
