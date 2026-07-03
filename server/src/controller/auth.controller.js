import { config } from "../config/config.js";
import { upsertStreamUser } from "../config/stream.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { email, password, fullName } = req.body;
    try {

        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "all field are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be a at least 6 characters" });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email formate" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exist, please use a different one" })
        }

        const profilePicUrl = `https://robohash.org/${encodeURIComponent(email)}`;

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: profilePicUrl,
        });

        try {
            await upsertStreamUser({
            id: newUser._id.toString(),
            name: newUser.fullName,
            image: newUser.profilePic || "",
        });
        console.log(`Stream user created for ${newUser.fullName}`);
        } catch (error) {
            console.log("Error creating Stream user:", error);
        }

        const token = jwt.sign({ userId: newUser._id }, config.JWT_SECRETS, {
            expiresIn: "7d"
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: config.NODE_ENV === "production"
        });

        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email, !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid email or password" });

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" })

        const token = jwt.sign({ userId: user._id }, config.JWT_SECRETS, {
            expiresIn: "7d"
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: config.NODE_ENV === "production"
        });

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const me = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(200).json({ success: true, message: "Logout Successful" });
    } catch (error) {

    }
};