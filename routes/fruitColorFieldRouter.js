import express from "express";
import {
  getFruitField,
  getFruitFieldUpdate,
  postFruitField,
  postFruitFieldUpdate,
} from "../controllers/fruitColorFieldController.js";

export const fruitColorFieldRouter = express.Router();

fruitColorFieldRouter
  .route("/:fruit/:colorField")
  .get(getFruitField)
  .post(postFruitField);

fruitColorFieldRouter
  .route("/:fruit/:colorField/update")
  .get(getFruitFieldUpdate)
  .post(postFruitFieldUpdate);
