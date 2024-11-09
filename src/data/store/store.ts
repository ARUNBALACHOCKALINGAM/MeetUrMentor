// store.js
import { configureStore } from '@reduxjs/toolkit';
import mentorReducer from './mentor';
import studentReducer from './student'
import userReducer from './user';


const store = configureStore({
  reducer: {
    mentor: mentorReducer,
    student: studentReducer,
    user: userReducer
    // Add other reducers here if needed
  },
});

export default store;