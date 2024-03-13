import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL as string);

    console.log(`MongoDB Connected 🟢 🟢 🟢 : ${conn.connection.host}`);
  } catch (err) {
    console.error("🔴 🔴 🔴", err);
    process.exit(1);
  }
};

export default connectDB;
