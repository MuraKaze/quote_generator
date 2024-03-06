import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import quotesReducer from './quotesReducer';
import quoteReducer from './quoteReducer';

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  quotes: quotesReducer,
  quote: quoteReducer

});

export default rootReducer;
