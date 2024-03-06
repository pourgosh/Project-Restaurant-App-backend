//import needed libraries
import express from "express";
import { config as dotEnvConfig } from "dotenv";
import { runConfig } from "./src/config/index.js";
import { errorHandler } from "./src/Error-handling/index.middleware.js";
import { setConnection as setUpConnection } from "./src/DB/index.js";
import authRoutes from "./src/Routes/auth.routes.js";

//set up app with express
const app = express();

//set up middleware

runConfig(app);
dotEnvConfig();

app.use("/", authRoutes);

setUpConnection();
errorHandler(app);
export default app;
