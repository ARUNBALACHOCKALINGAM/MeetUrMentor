import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosAuth from "../../utils/axiosInstance";




const initialState = {
  userType: localStorage.getItem("userType") || "student",
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
  avatar: "",
  isLoggedIn: false,
  isRegistered: false,
  modalMessage: "",
  isModalOpen: false,
  isLoggedOut: false,
  isDetailsValid: false,
  matchedUser:null,
  matchedUserDetails: {},
  currentLevel: ""
};


export const fetchUserDetails = createAsyncThunk("user/fetchUserDetails",async (email:any) => {
  try {
    console.log(email);
    const result = await axiosAuth.get(`/user/details?email=${email}`);
    return result.data;
  } catch (error:any) {
    isRejectedWithValue(error?.message || "Error while fetching user data");
  }
})

export const fetchMatchedUserDetails = createAsyncThunk("user/fetchMatchedUserDetails",async (matchedUser:any) => {
  try {
    const userDetails = await axiosAuth.get(`/user/details?id=${matchedUser}`)
    console.log(userDetails.data);
    if(userDetails.status==200){
      return userDetails.data;
    }     
  } catch (error:any) {
    isRejectedWithValue(error?.message || "Error while fetching user data");
  }
});


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
    setUserTrack: (state, action) => ({
      ...state,
      track: action.payload.track
    }),
    setAvatar: (state, action) => ({
      ...state,
      avatar: action.payload // Reducer to set avatar
    }),
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.modalMessage = "Login successful!";
      state.isModalOpen = true;
    },
    loginFailed: (state, action) => {
      state.modalMessage = action.payload.message;
      state.isModalOpen = true;
    },
    logoutSuccess: (state) => {
      state.modalMessage = "Logged out successfully";
      state.isModalOpen = true;
    },
    registerSuccess: (state) => {
      state.isRegistered = true;
      state.modalMessage = "User registered successfully!";
      state.isModalOpen = true;
    },
    registerFailed: (state, action) => {
      state.modalMessage = action.payload.message;
      state.isModalOpen = true;
    },
    addingDetailsFailed: (state, action) => {
      state.modalMessage = action.payload.message;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalMessage = "";
    },
    setMatchedUser: (state,action) => {
      state.matchedUser = action.payload.likedUser;
    },
    setMatchedUserDetails: (state,action) => {
      state.matchedUserDetails = action.payload.matchedUserDetails;
    }
  },
  extraReducers(builder){
    builder.addCase(fetchUserDetails.fulfilled,(state,action)=>{
      Object.assign(state,action.payload);
    }).addCase(fetchUserDetails.rejected,(state,action)=>{
      console.log(action.payload);
    }).addCase(fetchMatchedUserDetails.fulfilled,(state,action)=>{
      Object.assign(state.matchedUserDetails,action.payload);
    }).addCase(fetchMatchedUserDetails.rejected,(state,action)=>{
      console.log(action.payload);
    })
  }
});

export const {
  setUserLoginInfo,
  setUserTrack,
  setUserDetails,
  setUserType,
  setAvatar,
  loginSuccess,
  loginFailed,
  logoutSuccess,
  registerSuccess,
  registerFailed,
  addingDetailsFailed,
  closeModal,
  setMatchedUser,
  setMatchedUserDetails
} = userSlice.actions;

export default userSlice.reducer;
