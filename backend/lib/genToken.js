import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const genTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
    res.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    // res.cookie("token", token, {
    //     httpOnly: true,  // يمنع JavaScript من الوصول للكوكي
    //     secure: process.env.NODE_ENV === "production", // يجعل الكوكي آمنة على HTTPS فقط
    //     sameSite: "None", // يسمح بإرسال الكوكيز بين النطاقات المختلفة
    //     path: "/", // يضمن إرسال الكوكي مع جميع الطلبات
    //     maxAge: 24 * 60 * 60 * 1000 // مدة الصلاحية (يوم واحد)
    // });
}