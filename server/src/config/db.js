import mongoose from "mongoose"
import { config } from "./config.js";


export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Mongoose connected Successfully")
    } catch (error) {
        console.error("Mongoose connection failed:", error.message);
        throw error
        process.exit(1);
    }
}