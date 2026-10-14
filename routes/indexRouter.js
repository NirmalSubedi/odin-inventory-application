import express from "express";
import { NotFoundError } from "../errors/NotFoundError.js";

export const indexRouter = express.Router();

indexRouter.get("/", (req, res) => res.send("Hello World!"));

indexRouter.use((req, res) => {
  throw new NotFoundError("Page not found");
});
