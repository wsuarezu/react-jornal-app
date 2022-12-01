import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    email: null,
    status: 'checking', // , authenticated
    displayName: null,
    photoURL: null,
    errorMessage: null,
    uid: null
  },
  reducers: {
    login: (state, {payload}) => {
      state.email = payload.email;
      state.status = 'authenticated';
      state.displayName= payload.displayName;
      state.photoURL= payload.photoURL;
      state.errorMessage= null;
      state.uid = payload.uid;
    },
    logout: (state, {payload}) => {
      state.email = null;
      state.status = 'not-authenticated';
      state.displayName= null;
      state.photoURL= null;
      state.errorMessage= payload?.errorMessage;
      state.uid = null;
    },
    checkingCredentials: (state) => {
        //console.log(action);
        state.status = 'checking';
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions