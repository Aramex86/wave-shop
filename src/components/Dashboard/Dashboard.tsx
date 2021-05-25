import axios from "axios";
import React, { useEffect } from "react";
import Buttons from "../common/Buttons";
import UserLayout from "../Hoc/UserLayout";
import { useAppDispatch, useAppSelector } from "../Store/hooks/hooks";
import { getIsAuth, selectAuth } from "../Store/slices/userSlice";

const Dashboard = () => {
    // const isAuth = useAppSelector(selectAuth);
    // const dispatch = useAppDispatch();


    // useEffect(() => {
    //     dispatch(getIsAuth());
    //   }, []);

    //   console.log(isAuth)
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>name</span>
            <span>lastname</span>
            <span>email</span>
          </div>
          <Buttons
            type="default"
            title="Edit account info"
            linkTo="/user/user_profile"
          />
        </div>

        <div className="user_nfo_panel">
          <h1>History purchases</h1>
          <div className="user_product_block_wrapper">history</div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
