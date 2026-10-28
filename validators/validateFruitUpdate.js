import { body } from "express-validator";
import { validateFruitField } from "./chains/validateFruitField.js";

export const validateFruitUpdate = [
  body("fruit")
    .trim()
    .custom((value, { req }) => {
      if (value === req.params.fruit)
        throw new Error("Enter a new fruit name.");
      return true;
    })
    .bail({ level: "request" }),
  validateFruitField,
];
