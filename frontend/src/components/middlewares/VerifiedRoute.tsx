import { selectCurrentUser } from "@/store/selectors/user";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import UnVerified from "@pages/UnVerified";

type Props = {};

const VerifiedRoute = (props: Props) => {
  const user = useSelector(selectCurrentUser);
  return user.verified ? <Outlet /> : <UnVerified />;
};

export default VerifiedRoute;
