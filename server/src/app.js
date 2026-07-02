import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());    


//health check api
app.get("/", (req,res) =>{
    res.json({message: "ok"});
});

app.use("/api/auth", authRoute);


export default app;