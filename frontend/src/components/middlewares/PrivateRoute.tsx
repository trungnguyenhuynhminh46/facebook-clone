import { selectCurrentUser } from "@/store/selectors/user";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "@/pages/Login";

const PrivateRoute = () => {
  const user = useSelector(selectCurrentUser);
  // Set default theme
  if (user) {
    if (user.displayMode === "light") {
      document.documentElement.classList.remove("dark");
    }
    if (user.displayMode === "dark") {
      document.documentElement.classList.add("dark");
    }
    if (user.displayMode === "auto") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }

  return user ? <Outlet /> : <Login />;
};

export default PrivateRoute;
