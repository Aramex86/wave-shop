import axios from "axios";
import { LoginUserType, RegisterUser } from "../Types/types";

export const usersApi = {
  loginUser(data: LoginUserType) {
    return axios
      .post(`http://localhost:3002/api/users/login`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  registerUser(data: RegisterUser) {
    return axios
      .post(`http://localhost:3002/api/users/register`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  authUser() {
    return axios
      .get(`http://localhost:3002/api/users/auth`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  },
};
