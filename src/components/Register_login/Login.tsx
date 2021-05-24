import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../Store/hooks/hooks";
import { LoginUserType, UserSuccess } from "../../Types/types";
import { authUser, getUser, selectUser } from "../Store/slices/userSlice";
import { usersApi } from "../../api/api";
import { Redirect, useHistory } from "react-router-dom";

interface LogiForm {
  password: string;
  email: string;
}

const validate = (values: any) => {
  const errors = {} as LogiForm;

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values: LoginUserType) => {
      console.log(values);
      dispatch(authUser(values));
      if (user) return history.push("/users/dashboard");
    },
  });

  console.log(user);
  return (
    <div className="signin_wrapper">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : null}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}

        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
