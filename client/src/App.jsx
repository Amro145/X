import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/AuthPage/Signup";
import Login from "./components/AuthPage/Login";
import Home from "./components/Home/Home";
import Notifiction from "./components/Notifiction/Notifiction";
import Profile from "./components/profile/Profile";
import Followers from "./components/profile/Followers";
import Following from "./components/profile/Following";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store (3)/api/authApi";

function App() {
  const { userData, checkLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!checkLoading) {
      // Check authentication status
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      {checkLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              userData.length !== 0 ? <Home /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/signup"
            element={userData.length === 0 ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={userData.length === 0 ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/notifiction"
            element={
              userData.length !== 0 ? <Notifiction /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile/:id"
            element={
              userData.length !== 0 ? <Profile /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/profile/followers/:id"
            element={
              userData.length !== 0 ? <Followers /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/profile/following/:id"
            element={
              userData.length !== 0 ? <Following /> : <Navigate to="/login" />
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
