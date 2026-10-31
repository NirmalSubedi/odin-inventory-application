import { body, param } from "express-validator";
import { sameFruitNameError } from "../errors/validators/errors.js";
import { validateFruitField } from "./chains/aggregate.js";

export const validateFruitUpdate = [
  param("fruit").trim().toLowerCase(),
  body("fruit")
    .trim()
    .toLowerCase()
    .custom((value, { req }) => {
      if (value === req.params.fruit) throw new Error(sameFruitNameError);
      return true;
    })
    .bail({ level: "request" }),
  validateFruitField,
];
