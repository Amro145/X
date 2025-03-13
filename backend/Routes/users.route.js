import express from "express"
import { protectRoute } from "../MiddleWare/protectRoute.js"
import { followUnFollowUser, isGetSuggestedUser, getUsersProfile, updateProfile, updatePassword } from "../Contorller/users.controller.js"
const router = express.Router()

router.get("/profile/:userName", protectRoute, getUsersProfile)
router.post("/follow/:id", protectRoute, followUnFollowUser)
router.get("/suggested", protectRoute, isGetSuggestedUser)
router.put("/updateProfile", protectRoute, updateProfile)
router.put("/updatePassword", protectRoute, updatePassword)
export default router