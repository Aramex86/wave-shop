import React, { useEffect } from "react";
import { useFormik } from "formik";
import { RegisterUser } from "../../Types/types";
import { useAppDispatch, useAppSelector } from "../Store/hooks/hooks";
import { getRegisterUser, selectRegUser } from "../Store/slices/userSlice";
import SnackBar from "../common/SnackBar";
import { useHistory } from "react-router";

const validate = (values: any) => {
  const errors = {} as RegisterUser;

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 20) {
    errors.name = "Must be 20 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.name.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password.length > 20) {
    errors.confirmPassword = "Must be 20 characters";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password didn't match";
  }

  return errors;
};

const Register = () => {
  const dispatch = useAppDispatch();
  const regSuccess = useAppSelector(selectRegUser);
  const history = useHistory();

  const redirect=()=>{
    setTimeout(()=>{
        history.push("/register_login");
    },3000)
  }

  const formik = useFormik<RegisterUser>({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      if (values.password === values.confirmPassword) {
        const { name, lastName, email, password } = values;
        const validData = {
          name: name,
          lastName: lastName,
          email: email,
          password: password,
        };

        dispatch(getRegisterUser(validData));
      }
      redirect()
    },
  });

  console.log(regSuccess);
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <form onSubmit={formik.handleSubmit}>
              <h2>Personal information</h2>
              <div className="form_block_two">
                <div className="block">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Name"
                  />
                  {formik.errors.name ? (
                    <div style={{ color: "red" }}>{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="block">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    placeholder="Last Name"
                  />
                  {formik.errors.lastName ? (
                    <div style={{ color: "red" }}>{formik.errors.lastName}</div>
                  ) : null}
                </div>
              </div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Email"
                />
                {formik.errors.email ? (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                ) : null}
              </div>
              <h2>Verify password</h2>
              <div className="form_block_two">
                <div className="block">
                  <input
                    id="password"
                    name="password"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Password"
                  />
                  {formik.errors.password ? (
                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="block">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    placeholder="Confirm Password"
                  />
                  {formik.errors.confirmPassword ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <button type="submit">Create an account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {regSuccess && (
        <SnackBar
          type="success"
          className="snackbar snackbar-success"
          message="Congratulations !!!  You will be redirected to the LOGIN in a couple seconds..."
        />
      )}
    </div>
  );
};

export default Register;
