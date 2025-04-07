import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const ConnectToDb = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is undefined. Check your .env file.");
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connnect To DB Succefully");
  } catch (error) {
    console.log("Connnect To DB Faild", process.env.MONGO_URL, error);
  }
};
