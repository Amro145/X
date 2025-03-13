import express from "express";
import { getMe, singup, login, logout } from "../Contorller/auth.controller.js";
import { protectRoute } from "../MiddleWare/protectRoute.js";

const Router = express.Router();

Router.get("/check", protectRoute, getMe);
Router.post("/singup", singup);
Router.post("/login", login);
Router.post("/logout", logout);

export default Router;
