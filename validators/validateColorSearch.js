import { oneOf, query } from "express-validator";
import { isColorInDB } from "./custom/isColorInDB.js";

const requiredError =
  "Select either peel, fruit, or both color(s) to search by.";
const emptyError = "must not be empty.";

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
