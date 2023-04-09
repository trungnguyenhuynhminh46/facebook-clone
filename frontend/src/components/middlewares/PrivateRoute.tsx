import { selectCurrentUser } from "@/store/selectors/user";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "@/pages/Login";
import { AppDispatch } from "@/store/store";
import { fetchPosts } from "@/store/slices/posts";
import { useEffect } from "react";
import { useGetAllPostsQuery } from "@/store/api/postsApi";
import { upsertManyPosts } from "@/store/slices/posts";

const PrivateRoute = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    if (user) {
      const promise = dispatch(fetchPosts(user.token));
      return () => {
        promise.abort();
      };
    }
  }, [dispatch, user]);

  return user ? <Outlet /> : <Login />;
};

export default PrivateRoute;
