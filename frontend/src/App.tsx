import { Routes, Route } from "react-router-dom";
// Pages
import Login from "@pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Home from "@pages/Home";
import Profile from "@pages/Profile";
import PrivateRoute from "@/components/middlewares/PrivateRoute";
import VerifiedRoute from "./components/middlewares/VerifiedRoute";
import Verify from "./pages/Verify";
// Layouts
import HomeLayout from "./layouts/HomeLayout";
import NormalLayout from "./layouts/NormalLayout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route element={<PrivateRoute />}>
        <Route path="/verify/:token" element={<Verify />} />
        <Route element={<VerifiedRoute />}>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
