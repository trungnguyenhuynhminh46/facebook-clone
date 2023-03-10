import { Routes, Route } from "react-router-dom";
import { stories } from "@/data/fakeStories";
// Pages
import Login from "@pages/Login";
import Home from "@pages/Home";
import Profile from "@pages/Profile";
import PrivateRoute from "@/components/middlewares/PrivateRoute";
import VerifiedRoute from "./components/middlewares/VerifiedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route element={<VerifiedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
