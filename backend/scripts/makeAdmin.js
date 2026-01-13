import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const makeAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log('Connected to MongoDB');

    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

const email = process.argv[2];

if (!email) {
  process.exit(1);
}

makeAdmin(email);
