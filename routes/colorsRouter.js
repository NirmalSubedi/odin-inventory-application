import express from "express";
import {
  getColorsPage,
  respondWithMissingColor,
} from "../controllers/colorsController.js";

export const colorsRouter = express.Router();

colorsRouter.get("/", getColorsPage);

colorsRouter.use(respondWithMissingColor);
