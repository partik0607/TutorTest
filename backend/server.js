import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import quizRoutes from "./routes/quizroutes.js";
import userRoutes from "./routes/userroutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: ["https://tutortest-frontend.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

app.options("*", cors()); 

app.use(express.json());

// Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", quizRoutes);
app.use("/api/v1", userRoutes);

const PORT = process.env.PORT || 5000;
// monodb

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
