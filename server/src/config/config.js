import dotenv from "dotenv";
dotenv.config();


if (!process.env.PORT) {
    throw new Error("please provide PORT in .env file");
}

if (!process.env.MONGO_URI) {
    throw new Error("Please provide MONGO_URI in .env file");
}

if (!process.env.STREAM_API_KEY) {
    throw new Error("Please provide STREAM_API_KEY in .env file");
}

if (!process.env.STREAM_API_SECRET) {
    throw new Error("Please provide STREAM_API_SECRET in .env file");
}

if (!process.env.JWT_SECRETS) {
    throw new Error("Please provide JWT_SECRETS in .env file");
}

if (!process.env.STREAM_API_KEY) {
    throw new Error("Please provide STREAM_API_KEY in .env file");
}

if (!process.env.STREAM_API_SECRET) {
    throw new Error("Please provide STREAM_API_SECRET in .env file")
}

if (!process.env.NODE_ENV) {
    throw new Error("Please provide NODE_ENV in .env file")
}

export const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
    JWT_SECRETS: process.env.JWT_SECRETS,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
    NODE_ENV: process.env.NODE_ENV
}