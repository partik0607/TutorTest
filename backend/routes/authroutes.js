import express from "express";
import { registerUser, authUser } from "../controllers/authcontroler.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
// router.get("/allusers", authUser);

export default router;
