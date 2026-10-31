import { param } from "express-validator";
import { emptyError } from "../../errors/validators/errors.js";
import { isColorInDB } from "../custom/isColorInDB.js";

export const validateColorParam = param("color")
  .trim()
  .notEmpty()
  .withMessage(`Color param ${emptyError}`)
  .bail({ level: "request" })
  .toLowerCase()
  .custom(isColorInDB);
