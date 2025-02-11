// src/data/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import taskReducer from "./tasks";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer, // Changed to "tasks" to match usage in components
  },
});

// Export RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
