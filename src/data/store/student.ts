import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: {}
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentLoginInfo: (state,action) => {
      state.student = {
        ...state.student,
       ...action.payload
      };
    },
    setStudentDetails: (state,action) => {
        state.student = {
            ...state.student,
            ...action.payload
        }
    },
    setStudentPrompts: (state,action) => {
      state.student = {
          ...state.student,
          ...action.payload
      }
  },
    setStudentTrack: (state,action) => {
        state.student = {
            ...state.student,
            track: action.payload.track
        }
    }

  },
});

export const { setStudentLoginInfo,setStudentTrack,setStudentDetails,setStudentPrompts } = studentSlice.actions;
export default studentSlice.reducer;