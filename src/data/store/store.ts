// store.js
import { configureStore } from '@reduxjs/toolkit';
import mentorReducer from './mentor';
import studentReducer from './student'


const store = configureStore({
  reducer: {
    mentor: mentorReducer,
    student: studentReducer
    // Add other reducers here if needed
  },
});

export default store;