import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../Store/hooks/hooks";
import { LoginUserType } from "../../Types/types";
import { authUser, getUser, selectUser } from "../Store/slices/userSlice";
import { useHistory } from "react-router-dom";

const validate = (values: any) => {
  const errors = {} as LoginUserType;

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
  const [data, setData] = useState<LoginUserType>();

  useEffect(() => {
    if (data) {
      dispatch(authUser(data));
    }
  }, [data]);

  const ifUser = () => {
    if (user?.loginSuccess === false) {
      return null;
    } else if (user?.loginSuccess === true) {
      return history.push("/user/dashboard");
    }
  };

  const formik = useFormik<LoginUserType>({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values: LoginUserType) => {
      console.log(values);
      setData(values);
      ifUser();
    },
  });

  console.log(data);
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

      {user?.loginSuccess === false ? (
        <p style={{ color: "red", fontWeight: 500 }}>{user.message}</p>
      ) : null}
    </div>
  );
};

export default Login;
