import { Routes, Route } from "react-router-dom";
import { stories } from "@/data/fakeStories";
// Pages
import Login from "@pages/Login";
import Home from "@pages/Home";
import Profile from "@pages/Profile";
import PrivateRoute from "@/components/middlewares/PrivateRoute";
import VerifiedRoute from "./components/middlewares/VerifiedRoute";
import Verify from "./pages/Verify";
// Layouts
import HomeLayout from "./layouts/HomeLayout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
