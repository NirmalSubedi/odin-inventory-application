import express from "express";
import {
  getFruitField,
  getFruitFieldUpdate,
  postFruitField,
  postFruitFieldDelete,
  postFruitFieldUpdate,
} from "../controllers/fruitColorFieldController.js";

export const fruitColorFieldRouter = express.Router();

fruitColorFieldRouter
  .route("/:fruit/:colorField")
  .get(getFruitField)
  .post(postFruitField);

fruitColorFieldRouter
  .route("/:fruit/:colorField/:color/update")
  .get(getFruitFieldUpdate)
  .post(postFruitFieldUpdate);

fruitColorFieldRouter.post(
  "/:fruit/:colorField/:color/delete",
  postFruitFieldDelete,
);
