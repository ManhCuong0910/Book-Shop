import { createSlice } from '@reduxjs/toolkit'

const initialState = {
isAuthenticated: false,
user:{
    "email": null,
    "phone": null,
    "fullName": null,
    "role": null,
    "avatar": null,
    "id": null 
}
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    doLoginAction:(state,action) => {
        state.isAuthenticated = true;
        state.user = action.payload
    },
    doGetAccountAction:(state,action) => {
      state.isAuthenticated = true;
      state.user = action.payload
  }
  }
});

export const {doLoginAction,doGetAccountAction} = accountSlice.actions

export default accountSlice.reducer