import express from "express"
import { protectRoute } from "../MiddleWare/protectRoute.js"
import { followUnFollowUser, isGetSuggestedUser, getUsersProfile, updateProfile, updatePassword, getFollowing, getFollowers } from "../Contorller/users.controller.js"
const router = express.Router()

router.get("/profile/:id", protectRoute, getUsersProfile)
router.post("/follow/:id", protectRoute, followUnFollowUser)
router.get("/suggested", protectRoute, isGetSuggestedUser)
router.put("/updateProfile", protectRoute, updateProfile)
router.put("/updatePassword", protectRoute, updatePassword)
router.get("/following/:id", protectRoute, getFollowing)
router.get("/followers/:id", protectRoute, getFollowers)
export default router