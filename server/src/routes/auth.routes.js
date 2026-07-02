import { Router } from "express";
import { login, logout, me, signup } from "../controller/auth.controller.js";



const authRoute = Router();


authRoute.post("/signup", signup);

authRoute.post("/login", login);

authRoute.get("/me", me);

authRoute.post("/logout", logout);


export default authRoute;