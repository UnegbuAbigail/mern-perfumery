import express from "express";
import { signUp, verify } from "../controllers/authController.js";
import { signIn } from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// post request
router.post("/signup",signUp);
// post request for Sign In
router.post("/signin",signIn);
// verify
router.get("/verify",auth,verify);

export default router