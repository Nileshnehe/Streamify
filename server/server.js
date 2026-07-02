import { config } from "./src/config/config.js";
import app from "./src/app.js";


const startServer = async() => {

    try {
        app.listen(config.PORT, () => {
            console.log(`SERVER IS RUNNING ON ${config.PORT}`);
        });
    } catch (error) {
        console.log("Server startup failed:", error)
        process.exit(1);
    }
}

startServer();

