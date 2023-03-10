import { selectCurrentUser } from "@/store/selectors/user";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "@/pages/Login";

type Props = {};

const PrivateRoute = (props: Props) => {
  const user = useSelector(selectCurrentUser);
  return user ? <Outlet /> : <Login />;
};

export default PrivateRoute;
