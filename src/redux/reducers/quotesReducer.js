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
      const createdDateTime = new Date();
      const createdDate = createdDateTime.toLocaleDateString();
      const createdTime = createdDateTime.toLocaleTimeString();
      const newQuote = {
        ...action.payload,
        id: uuidv4(), // Generate UUID for the new quote
        createdDate,
        createdTime,
        likedBy: [],
        dislikedBy: [],
        comments: [],
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
      const { updatedQuote } = action.payload;
      const existingQuote = state.find(quote => quote.id === updatedQuote.id);
      if (existingQuote) {
        Object.assign(existingQuote, updatedQuote);
      }
    },
    deleteQuote: (state, action) => {
      const { quoteId } = action.payload;
      console.log(state.filter(quote => quote.id !== quoteId))
      return state.filter(quote => quote.id !== quoteId);
    },
    getQuote: (state, action) => {
      const { quoteId } = action.payload;
      const existingQuote = [...state].find(quote => quote.id === quoteId);
      if (existingQuote) {
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
    const users = []
    const quotes = response.data.map(quote => {
      const createdDateTime = new Date().toISOString().split('T');
      const numTags = Math.floor(Math.random() * 4);
      const shuffledTags = tags.sort(() => Math.random() - 0.5);
      const selectedTags = shuffledTags.slice(0, numTags);

      // Extract author and text from the response
      const { author } = quote;

      // Generate unique ID for author
      const authorId = uuidv4();
      const [firstName, lastName] = author.split(' ').slice(0, 2); // Task 1
      const userName = firstName; // Task 2
      const email = `${firstName}@test.com`;
      // Create new user object with author details
      const newUser = {
        id: authorId,
        firstName,
        lastName, // We don't have last name in this case
        userName, // Using author name as username
        email, // Using author name in email
        gender: 'Male', // Assuming all authors are male for simplicity
        password: 'test' // Setting a default password
      };
      users.push(newUser)

      // Update the quote object to store author's ID instead of name
      return {
        ...quote,
        author: authorId, // Store author's ID instead of name
        id: uuidv4(), // Generate unique ID for the quote
        createdDate: createdDateTime[0],
        createdTime: createdDateTime[1],
        likedBy: [],
        dislikedBy: [],
        comments: [],
        tags: selectedTags
      };
    });

    // Dispatch action to add the fetched users and quotes
    dispatch(addUserBySeed(users));
    dispatch(addQuoteBySeed(quotes));
  } catch (error) {
    console.error('Error fetching quotes:', error.message);
  }
};

