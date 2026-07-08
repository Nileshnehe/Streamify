import { config } from "./config/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import chatRoute from "./routes/chat.route.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//health check api
app.get("/api/health", (req, res) => {
    res.json({ message: "ok" });
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/chat", chatRoute);

// console.log("Current NODE_ENV:", config.NODE_ENV);

if (config.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../client/dist")));

    app.get("/*splat", (req, res) => {
        res.sendFile(path.join(__dirname, "../../client", "dist", "index.html"));
    });
}

export default app;