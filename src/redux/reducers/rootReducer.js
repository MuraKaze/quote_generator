import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import quotesReducer from './quotesReducer';
import quoteReducer from './quoteReducer';
import followReducer from './followReducer';

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  quotes: quotesReducer,
  quote: quoteReducer,
  follow: followReducer
});

export default rootReducer;
