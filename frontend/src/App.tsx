import { Routes, Route } from "react-router-dom";
import { stories } from "@/data/fakeStories";
// Pages
import Login from "@pages/Login";
import Home from "@pages/Home";
import Profile from "@pages/Profile";
import PrivateRoute from "@components/PrivateRoute";
import Stories from "@components/home/Stories";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
