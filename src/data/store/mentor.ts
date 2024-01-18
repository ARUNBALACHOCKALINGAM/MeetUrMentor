import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mentor: {}
};

const mentorSlice = createSlice({
  name: "mentor",
  initialState,
  reducers: {
    setMentorLoginInfo: (state,action) => {
      state.mentor = {
        ...state.mentor,
       ...action.payload
      };
    },
    setMentorDetails: (state,action) => {
        state.mentor = {
            ...state.mentor,
            ...action.payload
        }
    },
    setMentorPrompts: (state,action) => {
      state.mentor = {
          ...state.mentor,
          ...action.payload
      }
  },
    setMentorTrack: (state,action) => {
        state.mentor = {
            ...state.mentor,
            track: action.payload.track
        }
    }

  },
});

export const { setMentorLoginInfo,setMentorTrack,setMentorPrompts,setMentorDetails } = mentorSlice.actions;
export default mentorSlice.reducer;