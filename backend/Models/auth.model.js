import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        // required: true,


    },
    email: {
        type: String,
        trim: true,
        unique: true,
        // required: true,
    },
    password: {
        type: String,
        trim: true,
        minLength: 6,
        // required: true,

    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: [],
        },
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: [],
        },
    ],
    profilePic: {
        type: "String",
        default: "",
    },
    coverPic: {
        type: "String",
        default: "",
    },
    bio: {
        type: "String",
        default: "",
    },
    link: {
        type: "String",
        default: "",
    },
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: [],
        },
    ],
}, { timestamps: true })


const User = mongoose.model("User", UserSchema)
export default User