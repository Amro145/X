import express from "express"
import { protectRoute } from "../MiddleWare/protectRoute.js"
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getOnePost, getUserPosts, likeUnlike } from "../Contorller/post.controller.js"
const router = express.Router()

router.post("/createpost", protectRoute, createPost)
router.get("/all", protectRoute, getAllPosts)
router.get("/post/:id", protectRoute, getOnePost)
router.get("/following", protectRoute, getFollowingPosts)
router.get("/user/:userid", protectRoute, getUserPosts)
router.get("/liked", protectRoute, getLikedPosts)
router.delete("/:id", protectRoute, deletePost)
router.post("/comment/:id", protectRoute, commentOnPost)
router.put("/like/:id", protectRoute, likeUnlike)
export default router

