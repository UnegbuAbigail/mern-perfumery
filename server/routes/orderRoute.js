import express from "express";
import { order } from "../controllers/orderController.js"
const router = express.Router();
import { auth } from "../middleware/auth.js";

// post request for order

router.post("/create",auth,order);

export default router