import { Router } from "express";
import { login, logout, me, onboard, signup } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const authRoute = Router();


authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.get("/me", protectRoute, me);
authRoute.post("/logout", logout);

authRoute.post("/onboarding", protectRoute, onboard)


export default authRoute;