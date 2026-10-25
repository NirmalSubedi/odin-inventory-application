import { body } from "express-validator";
import { splitCamelCase } from "../utils/splitCamelCase.js";
import * as db from "../db/queries.js";
import { COLORS_PATH } from "../config.js";

const requiredError =
  "Select either peel, fruit, or both color(s) to search by.";
const emptyError = "must not be empty.";

export const validateFruitColorCreations = [
  body("fruit").trim().notEmpty().withMessage(`Fruit ${emptyError}`),
  body("colorField").trim().notEmpty().withMessage(`Color field ${emptyError}`),
  body()
    .custom((_, { req, location }) => {
      const { colorField } = req[location];
      const inputColorValue = req[location][colorField];
      const formattedField = splitCamelCase(colorField);

      if (!inputColorValue) throw new Error(`${formattedField} is required.`);
      if (inputColorValue.trim() === "")
        throw new Error(`${formattedField} ${emptyError}`);

      return true;
    })
    .bail()
    .custom(async (_, { req, location }) => {
      const { colorField } = req[location];
      const inputColorValue = req[location][colorField];
      const formattedField = splitCamelCase(colorField);

      const color = await db.getColor(inputColorValue);

      if (color.length === 0) {
        throw new Error(
          `Unknown ${formattedField}: ${inputColorValue}.  See ${req.protocol}://${req.get("host")}${COLORS_PATH} for available colors.`,
        );
      }

      return true;
    }),
];
