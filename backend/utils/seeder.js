import mongoose from "mongoose";
import dotenv from "dotenv";
import User from '../models/User.js' // adjust path as per your folder
import Quiz from "../models/Quiz.js"; // adjust path as per your folder
import connectDB from "../config/db.js"; // your db connect file
// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  // Your seeding logic here

  mongoose.connection.close();
};

seedData();