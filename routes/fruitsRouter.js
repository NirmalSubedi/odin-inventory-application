import express from "express";
import {
  getFruitCreation,
  getFruitDetails,
  getFruitsPage,
  postFruitCreation,
  respondWithMissingFruit,
  getFruitUpdate,
  postFruitUpdate,
} from "../controllers/fruitsController.js";
import { fruitColorFieldRouter } from "./fruitColorFieldRouter.js";

export const fruitsRouter = express.Router();

fruitsRouter.get("/", getFruitsPage);

fruitsRouter.route("/create").get(getFruitCreation).post(postFruitCreation);

fruitsRouter.get("/:fruit", getFruitDetails);

fruitsRouter.route("/:fruit/update").get(getFruitUpdate).post(postFruitUpdate);

fruitsRouter.use(fruitColorFieldRouter);

fruitsRouter.use(respondWithMissingFruit);
