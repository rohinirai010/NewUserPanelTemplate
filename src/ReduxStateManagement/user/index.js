import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './authSlice';
import formDataReducer from './formDataSlice';
import websiteBuilderReducer from './websiteBuilderSlice';

// Configure persist options
const persistConfig = {
  key: 'root',
  storage,
  // If you don't want to persist auth state, you can blacklist it
  // blacklist: ['auth']
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  formData: formDataReducer,
  websiteBuilder: websiteBuilderReducer
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore Redux Persist actions in serializable check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Created persistor 
export const persistor = persistStore(store);

//