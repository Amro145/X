import express from "express";
import { getMe, signup, login, logout } from "../Contorller/auth.controller.js";
import { protectRoute } from "../MiddleWare/protectRoute.js";

const Router = express.Router();

Router.get("/check", protectRoute, getMe);
Router.post("/signup", signup);
Router.post("/login", login);
Router.get("/logout", logout);

export default Router;
