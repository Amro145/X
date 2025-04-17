import jwt from "jsonwebtoken"
import User from "../Models/auth.model.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ message: "Please Login." })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token " })
        }
        const user = await User.findById(decoded.userId)
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        req.user = user
        next()
    } catch (error) {
        console.log("error in protcted route", error);
        return res.status(500).json({ message: "Error in Protct Route" })

    }
}