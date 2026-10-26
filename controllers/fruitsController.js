import { NotFoundError } from "../errors/NotFoundError.js";
import * as db from "../db/queries.js";
import { matchedData, validationResult } from "express-validator";
import { BAD_REQUEST, FRUITS_PATH, COLORS_DELIMITER } from "../config.js";
import {
  validateFruitColorCreations,
  validateFruitCreation,
} from "../validators/aggregate.js";
import {
  getFruitColorsCreationValues,
  getFruitCreationPageValues,
} from "../values/aggregate.js";

export const getFruitsPage = async (req, res) => {
  const fruits = await db.getAllFruits();
  res.render("fruits", { title: "All Fruits", fruits });
};

export const getFruitDetails = async (req, res) => {
  const { fruit } = req.params;
  const [fruitDetails] = await db.getAllColorsOfFruit(fruit);

  res.render("fruitDetails", {
    title: `Fresh Colors for ${fruit}`,
    fruit,
    fruitDetails,
    delimiter: COLORS_DELIMITER,
  });
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

export const respondWithMissingFruit = (req, res) => {
  throw new NotFoundError("Fruit not found.");
};
