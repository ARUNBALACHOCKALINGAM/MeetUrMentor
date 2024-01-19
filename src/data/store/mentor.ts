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
  company: "",
  role: "",
  track: ""
};

const mentorSlice = createSlice({
  name: "mentor",
  initialState,
  reducers: {
    setMentorLoginInfo: (state,action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    setMentorDetails: (state,action) => {
        return {
            ...state,
            ...action.payload
        };
    },
    setMentorPrompts: (state,action) => {
      return {
          ...state,
          ...action.payload
      };
  },
    setMentorTrack: (state,action) => {
        return {
            ...state,
            track: action.payload.track
        };
    }

  },
});

export const { setMentorLoginInfo,setMentorTrack,setMentorPrompts,setMentorDetails } = mentorSlice.actions;
export default mentorSlice.reducer;
