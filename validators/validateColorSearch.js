import { oneOf, query } from "express-validator";
import * as db from "../db/queries.js";
import { COLORS_PATH } from "../config.js";

const requiredError =
  "Select either peel, fruit, or both color(s) to search by.";
const emptyError = "must not be empty.";

const isColorInDB = async (inputColor, { req }) => {
  const color = await db.getColor(inputColor);
  if (color.length === 0)
    throw new Error(
      `Unknown color: ${inputColor}. See ${req.protocol}://${req.get("host")}${COLORS_PATH} for available colors.`,
    );
  return true;
};

export const validateColorSearch = [
  oneOf(
    [
      query("fruitColor")
        .trim()
        .notEmpty()
        .withMessage(`Fruit color search ${emptyError}`)
        .bail()
        .custom(isColorInDB),
      query("peelColor")
        .trim()
        .notEmpty()
        .withMessage(`Peel color search ${emptyError}`)
        .bail()
        .custom(isColorInDB),
    ],
    { message: requiredError, errorType: "flat" },
  ),
];
