import express from "express";
import {
  getFruitCreation,
  getFruitField,
  getFruitDetails,
  getFruitsPage,
  postFruitCreation,
  postFruitField,
  respondWithMissingFruit,
} from "../controllers/fruitsController.js";

export const fruitsRouter = express.Router();

fruitsRouter.get("/", getFruitsPage);
fruitsRouter.route("/create").get(getFruitCreation).post(postFruitCreation);

fruitsRouter.get("/:fruit", getFruitDetails);
fruitsRouter
  .route("/:fruit/:colorField")
  .get(getFruitField)
  .post(postFruitField);

fruitsRouter.use(respondWithMissingFruit);
