import express from "express";
import {
  getColorsPage,
  postSearchColor,
  respondWithMissingColor,
} from "../controllers/colorsController.js";

export const colorsRouter = express.Router();

colorsRouter.get("/", getColorsPage);
colorsRouter.post("/search", postSearchColor);

colorsRouter.use(respondWithMissingColor);
