import { body } from "express-validator";
import { isFruitNotInDB } from "../custom/aggregate.js";

const emptyError = "must not be empty.";

export const validateFruitField = body("fruit")
  .trim()
  .notEmpty()
  .withMessage(`Fruit name ${emptyError}`)
  .bail()
  .toLowerCase()
  .custom(isFruitNotInDB);
