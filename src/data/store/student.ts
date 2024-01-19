import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  about: "",
  highestQualification: "",
  university: "",
  cgpa: "",
  linkedIn: "",
  github: "",
  leetcode: "",
  codechef: "",
  portfolio: "",
  track: ""
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentLoginInfo: (state,action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    setStudentDetails: (state,action) => {
        return {
            ...state,
            ...action.payload
        };
    },
    setStudentPrompts: (state,action) => {
      return {
          ...state,
          ...action.payload
      };
  },
    setStudentTrack: (state,action) => {
        return {
            ...state,
            track: action.payload.track
        };
    }

  },
});

export const { setStudentLoginInfo,setStudentTrack,setStudentDetails,setStudentPrompts } = studentSlice.actions;
export default studentSlice.reducer;
