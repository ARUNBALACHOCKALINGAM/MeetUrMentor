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
  track: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserType: (state,action) => {
      return {
        ...state,
        userType:action.payload
      };
    },
    setUserLoginInfo: (state,action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    setUserDetails: (state,action) => {
        return {
            ...state,
            ...action.payload
        };
    },
    setUserPrompts: (state,action) => {
      return {
          ...state,
          ...action.payload
      };
  },
    setUserTrack: (state,action) => {
        return {
            ...state,
            track: action.payload.track
        };
    }

  },
});

export const { setUserLoginInfo,setUserTrack,setUserPrompts,setUserDetails,setUserType} = userSlice.actions;
export default userSlice.reducer;
