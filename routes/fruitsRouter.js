import express from "express";
import {
  getFruitDetails,
  getFruitsPage,
  respondWithMissingFruit,
} from "../controllers/fruitsController.js";

export const fruitsRouter = express.Router();

fruitsRouter.get("/", getFruitsPage);
fruitsRouter.get("/:fruit", getFruitDetails);

fruitsRouter.use(respondWithMissingFruit);
