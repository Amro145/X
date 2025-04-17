import User from "../Models/auth.model.js"
import Notification from "../Models/notification.model.js"
import Post from "../Models/post.model.js"
import { v2 as cloudinary } from "cloudinary"

export const createPost = async (req, res) => {
    try {
        const { text } = req.body
        let { image } = req.body
        const myId = req.user._id
        const me = await User.findById(myId)
        if (!me) {
            return res.status(400).json({ message: "User Not Found" })
        }
        if (!text && !image) {
            return res.status(400).json({ message: "Post should be have text or image" })
        }
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            image = uploadResponse.secure_url
        }
        const newPost = new Post({
            user: myId,
            text,
            image,
        })

        await newPost.save()
        const posts = await Post.find()



        if (me.followers && me.followers.length > 0) {
            // استخدام for...of للتأكد من التزامن الصحيح مع async/await
            for (const followerId of me.followers) {
                const newNotification = new Notification({
                    from: me._id,
                    to: followerId,
                    type: "post",
                    post: newPost._id, // Include the post ID in the notification
                });
                await newNotification.save();
            }
        }
        return res.status(201).json(posts)


    } catch (error) {
        console.log("error in create post", error);
        return res.status(500).json({ message: "error in create post" })
    }
}
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: " post not found   " })
        }
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "You are not authorized" })
        }
        if (post.image) {
            const imageId = post.image.split("/").pop().split(".")[0]
            await cloudinary.uploader.destroy(imageId)
        }
        await Post.findByIdAndDelete(post._id)
        const posts = await Post.find()
        return res.status(200).json(posts)

    } catch (error) {
        console.log("error in delete post", error);
        return res.status(500).json({ message: "error in delete post" })
    }
}
export const commentOnPost = async (req, res) => {
    try {
        const me = req.user;
        const postId = req.params.id;
        const { text } = req.body;

        // البحث عن البوست
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // التحقق من وجود نص التعليق
        if (!text) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        // إضافة التعليق إلى البوست
        const comment = { user: me._id, text };
        post.comment.push(comment); // تأكد من أن الحقل صحيح في السكيما (تعليق وليس comment)
        await post.save();

        // إرجاع البوست المحدد مع التعليقات
        const updatedPost = await Post.findById(postId)
            .populate({ path: "user", select: "-password" })
            .populate({ path: "comments.user", select: "-password" });

        // إنشاء إشعار للمستخدم صاحب البوست
        const newNotification = new Notification({
            from: me._id,
            to: post.user,
            type: "comment",
            text: text,
            post: post._id,
        });
        await newNotification.save();



        return res.status(201).json(updatedPost);
    } catch (error) {
        console.log("Error in adding comment:", error);
        return res.status(500).json({ message: "Error in adding comment" });
    }
};

export const likeUnlike = async (req, res) => {
    try {
        console.log("User in likeUnlike:", req.user); // Debug log
        const me = req.user;
        const postId = req.params.id;

        // البحث عن البوست
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // التحقق إذا كان المستخدم قد أبدى إعجابه بالفعل
        const isLike = post.likes.includes(me._id);

        // إذا لم يكن قد أبدى إعجابه، قم بإضافته
        if (!isLike) {
            await Post.findByIdAndUpdate(postId, {
                $push: { likes: me._id }
            });

            await User.findByIdAndUpdate(me._id, {
                $push: { likedPosts: postId }
            });

            // إنشاء إشعار للمستخدم صاحب البوست
            if (me._id.toString() !== post.user.toString()) {
                const newNotification = new Notification({
                    from: me._id,
                    to: post.user,
                    type: "like",
                });
                await newNotification.save();
            }

            // إرجاع البوست المحدث
            const updatedPost = await Post.findById(postId)
                .populate({ path: "user", select: "-password" })
                .populate({ path: "comment.user", select: "-password" });

            return res.status(200).json(updatedPost);
        } else {
            // إذا كان قد أبدى إعجابه بالفعل، قم بإلغاء الإعجاب
            await Post.findByIdAndUpdate(postId, {
                $pull: { likes: me._id }
            });

            await User.findByIdAndUpdate(me._id, {
                $pull: { likedPosts: postId }
            });

            // إرجاع البوست المحدث
            const updatedPost = await Post.findById(postId)
                .populate({ path: "user", select: "-password" })
                .populate({ path: "comment.user", select: "-password" });

            return res.status(200).json(updatedPost);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in like/unlike", error });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
            .populate({ path: "user", select: "-password" })
            .populate({ path: "comment.user", select: "-password" })

        if (posts.length === 0) {
            return res.status(200).json([])
        }
        return res.status(200).json(posts)

    } catch (error) {

        console.log("error in  get all post", error);
        return res.status(500).json({ message: "error in get all post" })
    }
}
export const getOnePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id).sort({ createdAt: -1 })
            .populate({ path: "user", select: "-password" })
            .populate({ path: "comment.user", select: "-password" })
        if (!post) {
            return res.status(400).json({ message: "Invalid Id" })
        }
        return res.status(200).json(post)

    } catch (error) {

        console.log("error in  one all post", error);
        return res.status(500).json({ message: "error in get one post" })
    }
}
export const getLikedPosts = async (req, res) => {
    try {
        const me = req.user
        if (!me) return res.status(404).json({ message: "user not found" })

        const posts = await Post.find({ _id: { $in: me.likedPosts } })
            .populate({ path: "user", select: "-password" })
            .populate({ path: "likes", select: "-password" })
            .populate({ path: "comment.user", select: "-password" })
        return res.status(200).json(posts)
    } catch (error) {
        console.log("error in  get liked post", error);
        return res.status(500).json({ message: "error in get liked post" })

    }

}
export const getFollowingPosts = async (req, res) => {
    try {
        const me = req.user
        if (!me) return res.status(404).json({ message: "user not found" })
        const myfollowingId = me.following
        const followingPosts = await Post.find({ user: { $in: myfollowingId } })
            .populate({ path: "user", select: "-password" })
            .populate({ path: "likes", select: "-password" })
            .populate({ path: "comment.user", select: "-password" })
        return res.status(200).json(followingPosts)
    } catch (error) {
        console.log("error in  get following post", error);
        return res.status(500).json({ message: "error in get following post" })


    }
}
export const getUserPosts = async (req, res) => {
    try {
        const userId = req.params.userid
        const user = await User.findById(userId)
        const userPosts = await Post.find({ user: { $in: user._id } })
            .populate({ path: "user", select: "-password" })
            .populate({ path: "likes", select: "-password" })
            .populate({ path: "comment.user", select: "-password" })
        if (!user) return res.status(404).json({ message: "user not found" })
        return res.status(200).json(userPosts)
    } catch (error) {
        console.log("error in  get user post", error);
        return res.status(500).json({ message: "error in get user post" })
    }

}