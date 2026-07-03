import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMyFriends, getRecommendedUsers, sendFriendRequest } from "../controller/user.controller.js";

const userRoute = Router();

// apply auth middleware to all userRoute
userRoute.use(protectRoute);

userRoute.get("/", getRecommendedUsers);
userRoute.get("/friends", getMyFriends);

userRoute.post("/friend-request/:id", sendFriendRequest);


export default userRoute;