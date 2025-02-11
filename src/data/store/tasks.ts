// src/redux/slices/tasksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosTask } from "../../utils/axiosInstance";

// Async thunk to fetch tasks grouped by levels
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosTask.post("/tasks", { track: "Frontend" });
        return response.data; // response will contain levels with populated tasks
    } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || "Error while fetching tasks");
    }
});

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        levels: [], // Stores levels with their respective tasks
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.levels = action.payload; // Store levels with their respective tasks
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default tasksSlice.reducer;
