import { genTokenAndSetCookie } from "../lib/genToken.js";
import User from "../Models/auth.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { userName, email } = req.body
  try {
    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
      return res.status(400).json({ message: "User Alredy Exist" })
    }
    // hash password
    const salt = await bcrypt.genSalt(10)
    const password = req.body.password
    const hashedPassword = await bcrypt.hash(password, salt)
    // create user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword
    })
    if (newUser) {
      await newUser.save()
      genTokenAndSetCookie(newUser._id, res)

      return res.status(201).json(newUser)

    } else {
      return res.status(400).json({ message: "Invalid data" })
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in signup", error })
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email })
    const isPasswordMatch = await bcrypt.compare(password, user?.password || "")
    if (!user || !isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    genTokenAndSetCookie(user._id, res)
    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({ message: "Error in login", error })
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 })
    return res.status(200).json({ message: "logout Succfully" })

  } catch (error) {
    return res.status(500).json({ message: "Error in logout ", error })
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: "Error in get Me ", error })

  }
}
