import { v2 as cloudinary } from "cloudinary"
import User from "../Models/auth.model.js"
import Notfication from "../Models/notification.model.js"
import bcrypt from "bcryptjs"

export const getUsersProfile = async (req, res) => {
    const { userName } = req.params
    try {
        const user = await User.findOne({ userName }).select("-password")
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        res.status(200).json(user)

    } catch (error) {
        console.log("error in get profile", error);
        return res.status(500).json({ message: "error in get profile" })

    }
}
export const followUnFollowUser = async (req, res) => {
    try {
        const { id } = req.params
        const selectedUser = await User.findById(id)
        const me = await User.findById(req.user._id)

        // check me and selected user is correct users
        if (!me || !selectedUser) {
            return res.status(400).json({ message: "User Not Found" })
        }
        // Check selected user !=== me
        if (selectedUser._id.toString() === me._id.toString()) {
            return res.status(400).json({ message: "You Can't Follow/UnFollow Your Self!" })
        }
        // check is me  following selectedUSer or no
        const isFollowing = me.following.includes(id)
        if (isFollowing) {
            // un Following
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
            return res.status(200).json({ message: "Follow" })
        } else {
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
            // send notfication
            const newnotifiction = new Notfication({
                from: me._id,
                to: selectedUser._id,
                type: "follow",
            })
            await newnotifiction.save()
            console.log("id", id, "me",);

            return res.status(200).json({ message: " UnFollow", })

        }

    } catch (error) {
        console.log("error in Follow/unfollow user", error);
        return res.status(500).json({ message: "error in Follow/un follow user" })
    }
}
export const isGetSuggestedUser = async (req, res) => {
    try {
        const me = req.user
        const myfollowinglist = await User.findById(me._id).select("following")
        const users = await User.aggregate([{
            $match: {
                _id: { $ne: me._id }
            }
        },
        {
            $sample: {
                size: 10
            }
        }
        ])
        const filtredUsers = users.filter(user => !myfollowinglist.following.includes(user._id))
        const suggestedUser = filtredUsers.slice(0, 4)
        suggestedUser.forEach(user => {
            user.password = null
        });
        res.status(200).json(suggestedUser)
    } catch (error) {
        console.log("get suggesteduser error", error);
        res.status(500).json({ message: "get suggesteduser error" })


    }


}
export const updateProfile = async (req, res) => {
    let { userName, email, bio, link, profilePic, coverPic } = req.body;
    const Id = req.user._id;
    const user = await User.findById(Id);

    try {
        if (profilePic) {
            if (user.profilePic) {
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
            }
            const uploadedImage = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadedImage.secure_url;
        }

        if (coverPic) {
            if (user.coverPic) {
                await cloudinary.uploader.destroy(user.coverPic.split("/").pop().split(".")[0]);
            }
            const uploadedImage = await cloudinary.uploader.upload(coverPic);
            coverPic = uploadedImage.secure_url; // Fixed assignment to coverPic
        }

        const updateData = await User.findByIdAndUpdate(
            Id,
            {
                userName,
                email,
                bio,
                link,
                profilePic,
                coverPic,
            },
            { new: true, runValidators: true }
        );
        console.log("updateData", updateData);

        return res.status(200).json(updateData);
    } catch (error) {
        console.log("update profile error", error);
        res.status(500).json({ message: "update profile error" });
    }
};

export const updatePassword = async (req, res) => {
    const Id = req.user._id
    const user = await User.findById(Id)
    let { password, oldPassword } = req.body

    try {
        if ((!oldPassword && password) || (!password && oldPassword) || (!oldPassword && !password)) {
            return res.status(400).json({ message: "please Out fill Password Inputs" })
        }
        if (oldPassword && password) {
            if (password.length < 6) {
                return res.status(400).json({ message: "Password is too Short" })
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password)
            if (isMatch) {
                const salt = await bcrypt.genSalt(10)
                password = await bcrypt.hash(password, salt)
                console.log("password Match");

            } else {
                return res.status(400).json({ message: "Old Password Is Not Correct Please Try Again" })
            }

        }
        const updateData = await User.findByIdAndUpdate(Id, {
            password
        }, { new: true, runValidators: true });


        return res.status(200).json(updateData)
    } catch (error) {
        console.log(error);

    }
}