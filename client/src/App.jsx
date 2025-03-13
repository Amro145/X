import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Hero from "./components/AuthPage/Hero";
import Singup from "./components/AuthPage/Singup";
import Login from "./components/AuthPage/Login";
import Home from "./components/Home/Home";
import Notifiction from "./components/Notifiction/Notifiction";
import Profile from "./components/profile/Profile";
import { useAuthStore } from "../store/AuthStore";
import { useEffect } from "react";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      {isCheckingAuth ? (
        <div className="flex justify-center h-screen   items-center absolute top-10 left-1/2">
          <span className={`loading loading-spinner  w-10`} />
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/singup"
            element={!authUser ? <Singup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/hero" element={<Hero />} />
          <Route
            path="/notifiction"
            element={authUser ? <Notifiction /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:username"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
