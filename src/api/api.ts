import axios from "axios";
import {  LoginUserType } from "../Types/types";

export const usersApi = {
  loginUser(data:LoginUserType) {
    return axios
      .post(
        `http://localhost:3002/api/users/login`,data
      )
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};
