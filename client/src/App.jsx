import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Hero from "./components/AuthPage/Hero";
import Signup from "./components/AuthPage/Signup";
import Login from "./components/AuthPage/Login";
import Home from "./components/Home/Home";
import Notifiction from "./components/Notifiction/Notifiction";
import Profile from "./components/profile/Profile";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { checkAuth } from "../store (3)/api/authApi";

function App() {
  const { userData, checkLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      {checkLoading ? (
        <div className="flex justify-center h-screen   items-center absolute top-10 left-1/2">
          <span className={`loading loading-spinner  w-10`} />
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={userData ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!userData ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!userData ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/hero" element={<Hero />} />
          <Route
            path="/notifiction"
            element={userData ? <Notifiction /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:username"
            element={userData ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
