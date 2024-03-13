import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import quotesReducer from './quotesReducer';
import quoteReducer from './quoteReducer';
import followReducer from './followReducer';
import reportReducer from './reportReducer';
import adminReducer from './adminReducer';
import tagsReducer from './tagsReducer';

const rootReducer = combineReducers({
  admin: adminReducer,
  user: userReducer,
  users: usersReducer,
  quotes: quotesReducer,
  quote: quoteReducer,
  follow: followReducer,
  report: reportReducer,
  tags: tagsReducer,
});

export default rootReducer;
