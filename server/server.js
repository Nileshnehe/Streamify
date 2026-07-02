import { config } from "./src/config/config.js";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const startServer = async() => {

    try {
        await connectDB();
        app.listen(config.PORT, () => {
            console.log(`SERVER IS RUNNING ON ${config.PORT}`);
        });
    } catch (error) {
        console.log("Server startup failed:", error)
        process.exit(1);
    }
}

startServer();

