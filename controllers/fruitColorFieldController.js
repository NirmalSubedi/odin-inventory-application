import { matchedData, validationResult } from "express-validator";
import { BAD_REQUEST, FRUITS_PATH } from "../config.js";
import * as db from "../db/queries.js";
import {
  validateFruitColorCreations,
  validateFruitColorUpdate,
} from "../validators/aggregate.js";
import {
  getFruitColorsCreationValues,
  getFruitColorsUpdatePageValues,
} from "../values/aggregate.js";

export const getFruitField = async (req, res) => {
  res.render("fruitColorCreation", await getFruitColorsCreationValues(req));
};

export const postFruitField = [
  validateFruitColorCreations,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const pageValues = await getFruitColorsCreationValues(req);
      pageValues.title = `Error: ${pageValues.title}`;
      pageValues.errors = errors.array();

      return res.status(BAD_REQUEST).render("fruitColorCreation", pageValues);
    }

    const { colorField, fruit } = matchedData(req);
    const color = req.body[colorField];

    if (colorField === "fruitColor") {
      await db.setFreshFruitColorsByFruitAndColor(fruit, color);
    } else if (colorField === "peelColor") {
      await db.setFreshFruitPeelColorsByFruitAndColor(fruit, color);
    }

    res.redirect(`${FRUITS_PATH}/${fruit}`);
  },
];

export const getFruitFieldUpdate = async (req, res) => {
  res.render(`fruitFieldUpdate`, await getFruitColorsUpdatePageValues(req));
};

export const postFruitFieldUpdate = [
  validateFruitColorUpdate,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const pageValues = await getFruitColorsUpdatePageValues(req);
      pageValues.title = `Error: ${pageValues.title}`;
      pageValues.errors = errors.array();
      return res.status(BAD_REQUEST).render("fruitFieldUpdate", pageValues);
    }

    const { fruit, colorField, color: oldColor } = req.params;
    const newColor = req.body[colorField];

    if (colorField === "fruitColor") {
      await db.updateFruitColor(fruit, oldColor, newColor);
    } else if (colorField === "peelColor") {
      await db.updatePeelColor(fruit, oldColor, newColor);
    }

    res.redirect(`${FRUITS_PATH}/${fruit}`);
  },
];

export const postFruitFieldDelete = async (req, res) => {
  res.send("postFruitFieldDelete");
};
