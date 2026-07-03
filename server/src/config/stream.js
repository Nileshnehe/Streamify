import { config } from "./config.js";
import { StreamChat } from "stream-chat";

const streamClient = StreamChat.getInstance(config.STREAM_API_KEY, config.STREAM_API_SECRET);


export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error("Error creating Stream user:", error);
    }
};


export const generateStreamToken = (userId) => {
    try {

        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error generating Stream token:", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
};