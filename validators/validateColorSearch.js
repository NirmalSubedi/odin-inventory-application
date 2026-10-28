import { oneOf, query } from "express-validator";
import {
  emptyError,
  requiredFruitSearchError,
} from "../errors/validators/errors.js";
import { isColorInDB } from "./custom/aggregate.js";

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
    { message: requiredFruitSearchError, errorType: "flat" },
  ),
];
