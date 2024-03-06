//import needed libraries
import express from "express";
import { config as dotEnvConfig } from "dotenv";
import { runConfig } from "./src/config/index.js";
import { errorHandler } from "./src/Error-handling/index.middleware.js";
import { setConnection as setUpConnection } from "./src/DB/index.js";
import authRoutes from "./src/Routes/auth.routes.js";
import staffRoutes from "./src/Routes/staff.routes.js";
import reservationRoutes from "./src/Routes/reservations.routes.js";
import foodRoutes from "./src/Routes/food.routes.js";
import menuRoutes from "./src/Routes/menu.routes.js";
import userRoutes from "./src/Routes/user.routes.js";
import drinkRoutes from "./src/Routes/drink.routes.js";

//set up app with express
const app = express();

//set up middleware

runConfig(app);
dotEnvConfig();

app.use("/", authRoutes);
app.use("/", staffRoutes);
app.use("/", reservationRoutes);
app.use("/", foodRoutes);
app.use("/", menuRoutes);
app.use("/", userRoutes);
app.use("/", drinkRoutes);

setUpConnection();
errorHandler(app);
export default app;
