import { NotFoundError } from "../errors/NotFoundError.js";
import * as db from "../db/queries.js";
import { removeDuplicateKeys } from "../utils/removeDuplicateKeys.js";
import { validateFruitCreation } from "../validators/validateFruitCreation.js";
import { matchedData, validationResult } from "express-validator";
import { BAD_REQUEST } from "../config.js";
import { getFruitCreationPageValues } from "../values/fruitCreationPageValues.js";

export const getFruitsPage = async (req, res) => {
  const fruits = await db.getAllFruits();
  res.render("fruits", { title: "All Fruits", fruits });
};

export const getFruitDetails = async (req, res) => {
  const { fruit } = req.params;
  let fruitDetails = (await db.getColorsOfFruit(fruit)).reduce(
    removeDuplicateKeys,
    {},
  );
  fruitDetails = Object.entries(fruitDetails);
  res.render("fruitDetails", {
    title: `Fresh Colors for ${fruit}`,
    fruit,
    fruitDetails,
  });
};

export const getFruitCreation = async (req, res) => {
  res.render("fruitCreation", await getFruitCreationPageValues());
};

export const postFruitCreation = [
  validateFruitCreation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const pageValues = await getFruitCreationPageValues();
      pageValues.title = `Error: ${pageValues.title}`;
      pageValues.errors = errors.array();
      return res.status(BAD_REQUEST).render("fruitCreation", pageValues);
    }

    const { fruit, fruitColor, peelColor } = matchedData(req);
    res.json({ fruit, fruitColor, peelColor });
  },
];

export const respondWithMissingFruit = (req, res) => {
  throw new NotFoundError("Fruit not found.");
};
