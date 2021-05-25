import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store/store";
import {
  isAuthType,
  LoginUserType,
  RegisterUser,
  UserSuccess,
} from "../../../Types/types";
import { usersApi } from "../../../api/api";

const initialState = {
  user: null as UserSuccess | null,
  regUser: null as RegisterUser | null,
  isAuth: null as isAuthType | null,
};

export const userSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    getUser: (state, { payload }) => {
      state.user = payload;
    },
    registerUser: (state, { payload }) => {
      state.regUser = payload;
    },
    authsUser:(state,{payload})=>{
      state.isAuth = payload
    }
  },
});

export const { getUser, registerUser,authsUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectRegUser = (state: RootState) => state.user.regUser;
export const selectAuth =(state:RootState)=>state.user.isAuth;

export const authUser =
  (data: LoginUserType): AppThunk =>
  async (dispatch) => {
    const res = await usersApi.loginUser(data);
    dispatch(getUser(res));
  };

export const getRegisterUser =
  (data: RegisterUser): AppThunk =>
  async (dispatch) => {
    const res = await usersApi.registerUser(data);
    dispatch(registerUser(res));
  };

  export const getIsAuth=():AppThunk=>async(dispatch)=>{
    const res = await usersApi.authUser()
    dispatch(authsUser(res))
  }

export default userSlice.reducer;
