import express from "express";
import { protectRoute } from "../MiddleWare/protectRoute.js"
import { deleteNotifictions, deleteOneNotifiction, getNotifictions } from "../Contorller/notifiction.controller.js";
const Route = express.Router()
Route.get("/", protectRoute, getNotifictions)
Route.delete("/", protectRoute, deleteNotifictions)
Route.delete("/:id", protectRoute, deleteOneNotifiction)
export default Route; 