'use client';

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
  }
  
const persistedReducer = persistReducer(persistConfig, userReducer)
  

export const store = configureStore({
    reducer: {user: persistedReducer},
    middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);