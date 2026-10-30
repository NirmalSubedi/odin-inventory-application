import { matchedData, validationResult } from "express-validator";
import { BAD_REQUEST, FRUITS_PATH } from "../config.js";
import * as db from "../db/queries.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import {
  validateFruitCreation,
  validateFruitUpdate,
} from "../validators/aggregate.js";
import {
  getFruitCreationPageValues,
  getFruitDetailsPageValues,
  getFruitUpdatePageValues,
} from "../values/aggregate.js";

export const getFruitsPage = async (req, res) => {
  const fruits = await db.getAllFruits();
  res.render("fruits", { title: "All Fruits", fruits });
};

export const getFruitDetails = async (req, res) => {
  res.render("fruitDetails", await getFruitDetailsPageValues(req));
};

export const getFruitCreation = async (req, res) => {
  res.render("fruitCreation", await getFruitCreationPageValues());
};

export const postFruitCreation = [
  validateFruitCreation,
  async (req, res) => {
    const errors = validationResult(req);
    const { fruit, fruitColor, peelColor } = matchedData(req, {
      onlyValidData: false,
    });

    if (!errors.isEmpty()) {
      const pageValues = await getFruitCreationPageValues();
      pageValues.title = `Error: ${pageValues.title}`;
      pageValues.errors = errors.array();
      pageValues.fruit = fruit;
      pageValues.fruitColorSelect = fruitColor;
      pageValues.peelColorSelect = peelColor;
      return res.status(BAD_REQUEST).render("fruitCreation", pageValues);
    }

    await db.setFruit(fruit, fruitColor, peelColor);
    res.redirect(FRUITS_PATH);
  },
];

export const getFruitUpdate = async (req, res) => {
  res.render("fruitUpdate", await getFruitUpdatePageValues(req));
};

export const postFruitUpdate = [
  validateFruitUpdate,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const pageValues = await getFruitUpdatePageValues(req);
      pageValues.title = `Error: ${pageValues.title}`;
      pageValues.errors = errors.array();

      return res.status(BAD_REQUEST).render("fruitUpdate", pageValues);
    }

    const { fruit: newFruitName } = matchedData(req);
    const { fruit: oldFruitName } = req.params;

    await db.updateFruitName(oldFruitName, newFruitName);
    res.redirect(FRUITS_PATH);
  },
];

export const postFruitDelete = async (req, res) => {
  const { fruit } = req.params;
  await db.deleteFruit(fruit);
  res.redirect(FRUITS_PATH);
};

export const respondWithMissingFruit = (req, res) => {
  throw new NotFoundError("Fruit not found.");
};
