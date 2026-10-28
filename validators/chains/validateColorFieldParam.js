import { param } from "express-validator";
import { emptyError } from "../../errors/validators/errors.js";
import { isValidColorField } from "../custom/isValidColorField.js";

export const validateColorFieldParam = param("colorField")
  .trim()
  .notEmpty()
  .withMessage(`Color field ${emptyError}`)
  .custom(isValidColorField);
