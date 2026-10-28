import { param } from "express-validator";
import { emptyError } from "../../errors/validators/errors.js";
import { isFruitInDB } from "../custom/isFruitInDB.js";

export const validateFruitParam = param("fruit")
  .trim()
  .notEmpty()
  .withMessage(`Fruit ${emptyError}`)
  .bail()
  .custom(isFruitInDB);
