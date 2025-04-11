import { genTokenAndSetCookie } from "../lib/genToken.js";
import User from "../Models/auth.model.js";
import bcrypt from "bcryptjs";

export const singup = async (req, res) => {
  const { userName, email } = req.body
  try {
    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
      return res.status(400).json({ message: "User Alredy Exist" })
    }
    // hash password
    const salt = await bcrypt.genSalt(10)
    const password = await req.body.password
    const hashedPassword = await bcrypt.hash(password, salt)
    // create user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword
    })
    if (newUser) {
      genTokenAndSetCookie(newUser._id, res)
      await newUser.save()
      return res.status(201).json(newUser)
    } else {
      return res.status(400).json({ message: "Invalid data" })
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in Singup", error })


  }
};
export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    const isPasswordMatch = await bcrypt.compare(password, user?.password || "")
    if (!user || !isPasswordMatch) {
      return res.status(400).json({ message: "User Name or Password is not correct" })
    }
    genTokenAndSetCookie(user._id, res)
    res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: "Error in Login ", error })
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "logout Succfully" })

  } catch (error) {
    return res.status(500).json({ message: "Error in logout ", error })
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: "Error in get Me ", error })

  }
}
