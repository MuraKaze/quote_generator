import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import tags from '../../Tags/tags.json'

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
    likeQuote: (state, action) => {
      const { quoteId, userId } = action.payload;
      const existingQuote = state.find(quote => quote.id === quoteId);
      if (existingQuote) {
        if (existingQuote.likedBy.includes(userId)) {
          // Remove userId if it exists in likedBy
          existingQuote.likedBy = existingQuote.likedBy.filter(id => id !== userId);
        } else {
          // Add userId if it doesn't exist in likedBy
          existingQuote.likedBy.push(userId);
        }
      }
    },
    dislikeQuote: (state, action) => {
      const { quoteId, userId } = action.payload;
      const existingQuote = state.find(quote => quote.id === quoteId);
      if (existingQuote) {
        if (existingQuote.dislikedBy.includes(userId)) {
          // Remove userId if it exists in likedBy
          existingQuote.dislikedBy = existingQuote.dislikedBy.filter(id => id !== userId);
        } else {
          // Add userId if it doesn't exist in likedBy
          existingQuote.dislikedBy.push(userId);
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
    likeComment: (state, action) => {
      const { quoteId, commentId, userId } = action.payload;
      const existingQuote = state.find(quote => quote.id === quoteId);
      if (existingQuote) {
        const existingComment = existingQuote.comments.find(comment => comment.id === commentId);
        if (existingComment) {
          if (existingComment.likedBy.includes(userId)) existingComment.likedBy = existingComment.likedBy.filter(id => id !== userId);
          else existingComment.likedBy.push(userId);
        }
      }
    },

    dislikeComment: (state, action) => {
      const { quoteId, commentId, userId } = action.payload;
      const existingQuote = state.find(quote => quote.id === quoteId);
      if (existingQuote) {
        const existingComment = existingQuote.comments.find(comment => comment.id === commentId);
        if (existingComment) {
          if (existingComment.dislikedBy.includes(userId)) existingComment.dislikedBy = existingComment.dislikedBy.filter(id => id !== userId);
          else existingComment.dislikedBy.push(userId);
        }
      }
    }
  }
});

export const { addQuote, addQuoteBySeed, editQuote, deleteQuote, getQuote, likeQuote, dislikeQuote, addComment, deleteComment, likeComment, dislikeComment } = quotesSlice.actions;

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
    dispatch(addQuoteBySeed(quotes));
  } catch (error) {
    console.error('Error fetching quotes:', error.message);
  }
};
