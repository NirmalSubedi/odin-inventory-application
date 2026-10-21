import { body } from "express-validator";
import { isColorInDB } from "./custom/isColorInDB.js";

const emptyError = "must not be empty.";

export const validateFruitCreation = [
  body("fruit").trim().notEmpty().withMessage(`Fruit name ${emptyError}`),
  body("fruitColor")
    .trim()
    .notEmpty()
    .withMessage(`Fruit color ${emptyError}`)
    .bail()
    .custom(isColorInDB),
  body("peelColor")
    .trim()
    .notEmpty()
    .withMessage(`Peel color ${emptyError}`)
    .bail()
    .custom(isColorInDB),
];
