import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import authReducer from './slices/authSlice';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Configure store with root reducer
export const store = configureStore({
  reducer: rootReducer,
});
