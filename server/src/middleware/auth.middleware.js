import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // 1. Get the token from the cookies
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // 2. Verify the token using your secret key
        const decoded = jwt.verify(token, config.JWT_SECRETS);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        // 3. Find the user in the database
        // We use .select("-password") so we DON'T send the password hash back to the frontend!
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 4. Attach the user object to the request and move to the next function
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};