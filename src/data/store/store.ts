// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';


const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here if needed
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;