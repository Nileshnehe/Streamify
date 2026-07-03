import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controller/chat.controller.js";

const chatRoute = Router();

chatRoute.post("/token", protectRoute, getStreamToken);


export default chatRoute;