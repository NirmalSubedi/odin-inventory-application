import { NotFoundError } from "../errors/NotFoundError.js";
import * as db from "../db/queries.js";
import { matchedData, validationResult } from "express-validator";
import { BAD_REQUEST, FRUITS_PATH, COLORS_DELIMITER } from "../config.js";
import { validateFruitCreation } from "../validators/aggregate.js";
import { getFruitCreationPageValues } from "../values/aggregate.js";

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

export const getFruitUpdate = async (req, res) => {
  res.send("fruitUpdate");
};
export const postFruitUpdate = async (req, res) => {
  res.send("post fruitUpdate");
};

export const respondWithMissingFruit = (req, res) => {
  throw new NotFoundError("Fruit not found.");
};
