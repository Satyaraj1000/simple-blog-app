import mongoose from "mongoose";

const connectionDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected Successfully..");
  } catch (error) {
    console.error("Connection Fail:", error);
  }
};

export default connectionDb;
