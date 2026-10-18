import path from "node:path";
import express from "express";
import { PORT } from "./config.js";
import { fruitsRouter } from "./routes/fruitsRouter.js";
import { colorsRouter } from "./routes/colorsRouter.js";
import { indexRouter } from "./routes/indexRouter.js";
import { errorHandler, requestLogger } from "./controllers/globalController.js";

const app = express();

// App Settings
app.set("view engine", "ejs");

// Global Middlewares
app.use(requestLogger);
const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/colors", colorsRouter);
app.use("/fruits", fruitsRouter);
app.use("/", indexRouter);

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`Express app listening on port: ${PORT}`);
});
