import { selectCurrentUser } from "@/store/selectors/user";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import UnVerified from "@pages/UnVerified";

const VerifiedRoute = () => {
  const user = useSelector(selectCurrentUser);
  return user.verified ? <Outlet /> : <UnVerified />;
};

export default VerifiedRoute;
