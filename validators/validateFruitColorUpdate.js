import { body } from "express-validator";
import { COLORS_PATH } from "../config.js";
import * as db from "../db/queries.js";
import { splitCamelCase } from "../utils/aggregate.js";
import {
  validateColorFieldParam,
  validateColorParam,
  validateFruitParam,
} from "./chains/aggregate.js";
import { hasColorFieldValue } from "./custom/aggregate.js";

export const validateFruitColorUpdate = [
  validateFruitParam,
  validateColorFieldParam,
  validateColorParam,
  body()
    .custom(hasColorFieldValue("to update"))
    .custom((_, { req, location }) => {
      const { colorField, color } = req.params;
      const inputColorValue = req[location][colorField];
      const formattedField = splitCamelCase(colorField).toLowerCase();

      if (inputColorValue === color)
        throw new Error(`Select new ${formattedField}.`);
      return true;
    })
    .bail()
    .custom(async (_, { req, location }) => {
      const { colorField } = req.params;
      const inputColorValue = req[location][colorField];
      const formattedField = splitCamelCase(colorField).toLowerCase();

      const color = await db.getColor(inputColorValue);

      if (color.length === 0) {
        throw new Error(
          `Unknown ${formattedField}: ${inputColorValue}.  See ${req.protocol}://${req.get("host")}${COLORS_PATH} for available colors.`,
        );
      }

      return true;
    }),
];
