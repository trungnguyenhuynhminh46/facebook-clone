import { selectCurrentUser } from "@/store/selectors/user";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "@/pages/Login";

const PrivateRoute = () => {
  const user = useSelector(selectCurrentUser);
  return user ? <Outlet /> : <Login />;
};

export default PrivateRoute;
