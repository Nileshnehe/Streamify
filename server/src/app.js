import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import chatRoute from "./routes/chat.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());    


//health check api
app.get("/", (req,res) =>{
    res.json({message: "ok"});
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/chat", chatRoute);


export default app;