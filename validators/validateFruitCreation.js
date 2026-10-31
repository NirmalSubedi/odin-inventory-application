import { body } from "express-validator";
import { emptyError } from "../errors/validators/errors.js";
import { validateFruitField } from "./chains/aggregate.js";
import { isColorInDB } from "./custom/aggregate.js";

export const validateFruitCreation = [
  validateFruitField,
  body("fruitColor")
    .trim()
    .notEmpty()
    .withMessage(`Fruit color ${emptyError}`)
    .bail()
    .toLowerCase()
    .custom(isColorInDB),
  body("peelColor")
    .trim()
    .notEmpty()
    .withMessage(`Peel color ${emptyError}`)
    .bail()
    .toLowerCase()
    .custom(isColorInDB),
];
