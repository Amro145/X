import mongoose from "mongoose";
export const ConnectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    // console.log("Connnect To DB Succefully");
  } catch (error) {
    // console.log("Connnect To DB Faild", error);

  }
};
