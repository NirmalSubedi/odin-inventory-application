import { body } from "express-validator";
import { isColorInDB } from "./custom/aggregate.js";
import { validateFruitField } from "./chains/validateFruitField.js";

const emptyError = "must not be empty.";

export const validateFruitCreation = [
  validateFruitField,
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
