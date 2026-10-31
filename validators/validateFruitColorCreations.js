import { body } from "express-validator";
import { COLORS_PATH } from "../config.js";
import * as db from "../db/queries.js";
import { splitCamelCase } from "../utils/aggregate.js";
import {
  validateColorFieldParam,
  validateFruitParam,
} from "./chains/aggregate.js";
import { hasColorFieldValue } from "./custom/aggregate.js";

export const validateFruitColorCreations = [
  validateFruitParam,
  validateColorFieldParam,
  body()
    .custom(hasColorFieldValue("to add"))
    .bail()
    .customSanitizer((body, { req }) => {
      const { colorField } = req.params;
      body[colorField] = body[colorField].trim().toLowerCase();
      return body;
    })
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
