import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessage);

router.post("/send/:id", protectRoute, sendMessage); // run protectRoute before run sendMessage function
// use protectRoute as a authenticator not everyone can send the message in our app

export default router;
