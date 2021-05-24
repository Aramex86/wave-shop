import React from "react";
import { useAppSelector, useAppDispatch } from "../Store/hooks/hooks";
import {  selectUser } from "../Store/slices/userSlice";

const Home = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  console.log(user);
  return <div>Home</div>;
};

export default Home;
