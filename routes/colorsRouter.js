import express from "express";
import {
  getColorsPage,
  getSearchColor,
  respondWithMissingColor,
} from "../controllers/colorsController.js";

export const colorsRouter = express.Router();

colorsRouter.get("/", getColorsPage);
colorsRouter.get("/search", getSearchColor);

colorsRouter.use(respondWithMissingColor);
