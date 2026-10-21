import express from "express";
import {
  getFruitCreation,
  getFruitDetails,
  getFruitsPage,
  postFruitCreation,
  respondWithMissingFruit,
} from "../controllers/fruitsController.js";

export const fruitsRouter = express.Router();

fruitsRouter.get("/", getFruitsPage);
fruitsRouter.route("/create").get(getFruitCreation).post(postFruitCreation);

fruitsRouter.get("/:fruit", getFruitDetails);

fruitsRouter.use(respondWithMissingFruit);
