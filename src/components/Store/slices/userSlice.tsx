import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store/store";
import  { LoginUserType, UserSuccess } from '../../../Types/types'
import { usersApi } from "../../../api/api";




const initialState = {
  user: {} as UserSuccess 
};

export const userSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    getUser: (state,{payload}) => {
      state.user = payload
    },
  },
});

export const { getUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export const authUser=(data:LoginUserType):AppThunk=>async(dispatch,getstate)=>{
  const res = await usersApi.loginUser(data)
  console.log(res.loginSuccess)
  dispatch(getUser(res));
}


export default userSlice.reducer;
