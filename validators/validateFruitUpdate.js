import { body } from "express-validator";
import { validateFruitField } from "./chains/aggregate.js";
import { sameFruitNameError } from "../errors/validators/errors.js";

export const validateFruitUpdate = [
  body("fruit")
    .trim()
    .custom((value, { req }) => {
      if (value === req.params.fruit) throw new Error(sameFruitNameError);
      return true;
    })
    .bail({ level: "request" }),
  validateFruitField,
];
