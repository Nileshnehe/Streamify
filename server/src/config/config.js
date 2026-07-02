import dotenv from "dotenv";
dotenv.config();


if (!process.env.PORT) {
    throw new Error("please provide PORT in .env file");
}



export const config = {
    PORT: process.env.PORT,
}