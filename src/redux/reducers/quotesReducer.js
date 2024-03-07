import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import tags from '../../Tags/tags.json'
import { addUserBySeed } from './usersReducer';

const initialState = [];

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    addQuote: (state, action) => {
      const newQuote = {
        ...action.payload,
        id: uuidv4(), // Generate UUID for the new quote
      };
      state.push(newQuote);
    },
    addQuoteBySeed: (state, action) => {
      state.splice(0); // Clear existing quotes
      const quotesWithIds = action.payload.map(quote => ({
        ...quote,
        id: uuidv4(), // Generate UUID for each quote
      }));
      state.push(...quotesWithIds);
    },
    editQuote: (state, action) => {
      const { id, ...updatedQuote } = action.payload;
      const existingQuote = state.find(quote => quote.id === id);
      if (existingQuote) {
        Object.assign(existingQuote, updatedQuote);
      }
    },
    deleteQuote: (state, action) => {
      const quoteId = action.payload;
      return state.filter(quote => quote.id !== quoteId);
    },
    getQuote: (state, action) => {
      const { quoteId } = action.payload;
      const existingQuote = [...state].find(quote => quote.id === quoteId);
      if (existingQuote) {
        console.log(existingQuote)
        return existingQuote;
      } else {
        console.log('QUOTE not Found');
      }
    },
    changeQuoteReaction: (state, action) => {
      const { quoteId, userId, reaction } = action.payload
      const existingQuote = state.find(quote => quote.id === quoteId)
      if (existingQuote) {
        if (reaction === 'like') {
          if (existingQuote.dislikedBy.includes(userId)){
            existingQuote.dislikedBy = existingQuote.dislikedBy.filter(id => id !== userId);
          }
          if (existingQuote.likedBy.includes(userId)){
            existingQuote.likedBy = existingQuote.likedBy.filter(id => id !== userId);
          }
          else{
            existingQuote.likedBy.push(userId);
          }
        }
        if (reaction === 'dislike') {
          if (existingQuote.likedBy.includes(userId)) {
            existingQuote.likedBy = existingQuote.likedBy.filter(id => id !== userId)
          }
          if (existingQuote.dislikedBy.includes(userId)){
            existingQuote.dislikedBy = existingQuote.dislikedBy.filter(id => id !== userId)
          }
          else{
            existingQuote.dislikedBy.push(userId)
          }
        }
      }
    },
    addComment: (state, action) => {
      const { quoteId, userId, comment } = action.payload;
      const existingQuote = state.find(quote => quote.id === quoteId)
      if (existingQuote) {
        existingQuote.comments.push({ id: uuidv4(), userId, text: comment, likedBy: [], dislikedBy: [] });
      }
    },
    deleteComment: (state, action) => {
      const { quoteId, userId, commentId } = action.payload;
      const existingQuote = state.find(quote => quote.id === quoteId);
      if (existingQuote) {
        existingQuote.comments = existingQuote.comments.filter(comment => !(comment.userId === userId && comment.id === commentId));
      }
    },
    changeCommentReaction: (state, action) => {
      const { quoteId, commentId, userId, reaction } = action.payload;
      console.log(action.payload)
      const existingQuote = state.find(quote => quote.id === quoteId);
      if (existingQuote) {
        const existingComment = existingQuote.comments.find(comment => comment.id === commentId);
        if (existingComment) {
          if (reaction === 'like') {
            if (existingComment.dislikedBy.includes(userId)){
              existingComment.dislikedBy = existingComment.dislikedBy.filter(id => id !== userId);
            }
            if (existingComment.likedBy.includes(userId)){
              existingComment.likedBy = existingComment.likedBy.filter(id => id !== userId);
            }
            else{
              existingComment.likedBy.push(userId);
            }
          }
          if (reaction === 'dislike') {
            if (existingComment.likedBy.includes(userId)) {
              existingComment.likedBy = existingComment.likedBy.filter(id => id !== userId)
            }
            if (existingComment.dislikedBy.includes(userId)){
              existingComment.dislikedBy = existingComment.dislikedBy.filter(id => id !== userId)
            }
            else{
              existingComment.dislikedBy.push(userId)
            }
          }
        }
      }
    },
  }
});

export const { addQuote, addQuoteBySeed, editQuote, deleteQuote, getQuote, changeQuoteReaction, changeCommentReaction, addComment, deleteComment } = quotesSlice.actions;

export default quotesSlice.reducer;

export const fetchQuotes = () => async (dispatch) => {
  try {
    const response = await axios.get('https://type.fit/api/quotes');
    const quotes = response.data.map(quote => {
      const createdDateTime = new Date().toISOString().split('T');
      // Generate a random number between 0 and 3 to determine the number of tags for each quote
      const numTags = Math.floor(Math.random() * 4);
      // Shuffle the tags array to ensure randomness
      const shuffledTags = tags.sort(() => Math.random() - 0.5);
      // Select up to numTags random tags from the shuffled array
      const selectedTags = shuffledTags.slice(0, numTags);
      return {
        ...quote,
        id: uuidv4(),
        createdDate: createdDateTime[0],
        createdTime: createdDateTime[1],
        likedBy: [],
        dislikedBy: [],
        comments: [],
        tags: selectedTags,
      };
    });
    const authorNames = [...new Set(quotes.map(quote => quote.author))];

    const users = authorNames.map(authorName => {
      const [firstName, lastName] = authorName.split(' ').slice(0, 2); // Task 1
      const userName = firstName; // Task 2
      const email = `${firstName}@test.com`;
      const gender = 'Male';
      const password = 'test';
      const id = uuidv4();

      return {
        id,
        firstName,
        lastName,
        userName,
        gender,
        email,
        password
      };
    });
    dispatch(addUserBySeed(users))
    // Dispatch action to add the fetched quotes and author names
    dispatch(addQuoteBySeed(quotes));
  } catch (error) {
    console.error('Error fetching quotes:', error.message);
  }

};
