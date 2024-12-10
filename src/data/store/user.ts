import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: "student",
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
  track: "",
  avatar: "" // New field for avatar
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserType: (state, action) => ({
      ...state,
      userType: action.payload
    }),
    setUserLoginInfo: (state, action) => ({
      ...state,
      ...action.payload
    }),
    setUserDetails: (state, action) => ({
      ...state,
      ...action.payload
    }),
    setUserPrompts: (state, action) => ({
      ...state,
      ...action.payload
    }),
    setUserTrack: (state, action) => ({
      ...state,
      track: action.payload.track
    }),
    setAvatar: (state, action) => ({
      ...state,
      avatar: action.payload // Reducer to set avatar
    })
  }
});

export const {
  setUserLoginInfo,
  setUserTrack,
  setUserPrompts,
  setUserDetails,
  setUserType,
  setAvatar
} = userSlice.actions;

export default userSlice.reducer;
