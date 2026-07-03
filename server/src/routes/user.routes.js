import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendRequests, getRecommendedUsers, sendFriendRequest } from "../controller/user.controller.js";

const userRoute = Router();

// apply auth middleware to all userRoute
userRoute.use(protectRoute);

userRoute.get("/", getRecommendedUsers);
userRoute.get("/friends", getMyFriends);

userRoute.post("/friend-request/:id", sendFriendRequest);
userRoute.put("/friend-request/:id/accept", acceptFriendRequest);

userRoute.get("/friend-requests", getFriendRequests);
userRoute.get("/outgoing-friend-requests", getOutgoingFriendRequests);


export default userRoute;