import express from "express";
import authRoutes from "./Routes/auth.route.js";
import userRoute from "./Routes/users.route.js";
import postRoutes from "./Routes/post.route.js";
import notifictionRoutes from "./Routes/notifiction.route.js";
import dotenv from "dotenv";
import { ConnectToDb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors"
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,  
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
  ConnectToDb();
});
app.use(express.urlencoded({ extended: true })); // لفك تشفير بيانات الفورم
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
  
); app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/post", postRoutes);
app.use("/api/notifiction", notifictionRoutes);
