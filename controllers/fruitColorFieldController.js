import * as db from "../db/queries.js";
import { matchedData, validationResult } from "express-validator";
import { getFruitColorsCreationValues } from "../values/aggregate.js";
import { BAD_REQUEST, FRUITS_PATH } from "../config.js";
import { validateFruitColorCreations } from "../validators/validateFruitColorCreations.js";

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

export const getFruitFieldUpdate = async (req, res) => {};
export const postFruitFieldUpdate = async (req, res) => {};
