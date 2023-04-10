import { Routes, Route } from "react-router-dom";
// Pages
import Login from "@pages/Login";
import ResetPassword from "@pages/ResetPassword";
import Home from "@pages/Home";
import Profile from "@pages/Profile";
import PrivateRoute from "@/components/middlewares/PrivateRoute";
import VerifiedRoute from "./components/middlewares/VerifiedRoute";
import Verify from "@pages/Verify";
import NotFound from "@pages/NotFound";
import { Navigate } from "react-router-dom";
// Layouts
import HomeLayout from "@layouts/HomeLayout";
import ProfileLayout from "@layouts/ProfileLayout";
import BookMarks from "@pages/BookMarks/BookMarks";
import { ToastContainer } from "react-toastify";
import ProfilePosts from "@pages/Profile/ProfilePosts";
import ProfilePostsList from "@pages/Profile/ProfilePosts/ProfilePostsList";
import ProfilePostsGrid from "./pages/Profile/ProfilePosts/ProfilePostsGrid";
import ProfileAbout from "@pages/Profile/ProfileAbout";
import ProfileFriends from "@pages/Profile/ProfileFriends";
import ProfilePhotos from "@pages/Profile/ProfilePhotos";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route element={<PrivateRoute />}>
          <Route path="/verify/:token" element={<Verify />} />
          <Route element={<VerifiedRoute />}>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:email" element={<ProfileLayout />}>
                {/* Posts */}
                <Route path="" element={<ProfilePosts />}>
                  <Route index element={<ProfilePostsList />} />
                  <Route path="grid" element={<ProfilePostsGrid />} />
                </Route>
                {/* Abouts */}
                <Route path="about" element={<ProfileAbout />}></Route>
                {/* Friends */}
                <Route path="friends" element={<ProfileFriends />}></Route>
                {/* Photos */}
                <Route path="photos" element={<ProfilePhotos />}></Route>
              </Route>
              <Route path="/bookmarks" element={<BookMarks />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        icon={false}
      />
    </>
  );
}

export default App;
