import { body, param } from "express-validator";
import { splitCamelCase } from "../utils/aggregate.js";
import * as db from "../db/queries.js";
import { COLORS_PATH } from "../config.js";
import {
  isFruitInDB,
  isValidColorField,
  hasColorFieldValue,
} from "./custom/aggregate.js";

const emptyError = "must not be empty.";

export const validateFruitColorCreations = [
  param("fruit")
    .trim()
    .notEmpty()
    .withMessage(`Fruit ${emptyError}`)
    .bail()
    .custom(isFruitInDB),
  param("colorField")
    .trim()
    .notEmpty()
    .withMessage(`Color field ${emptyError}`)
    .custom(isValidColorField),
  body()
    .custom(hasColorFieldValue)
    .bail()
    .custom(async (_, { req, location }) => {
      const { colorField } = req.params;
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
