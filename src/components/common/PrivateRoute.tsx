import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Store/hooks/hooks";
import { getIsAuth, selectAuth } from "../Store/slices/userSlice";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isAuth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIsAuth());
  }, []);

  console.log(isAuth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/register_login" />
      }
    />
  );
};

export default PrivateRoute;
