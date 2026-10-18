import { body } from "express-validator";

const emptyError = "Select a color to search by.";

export const validateColorSearch = [
  body("searchColor").trim().notEmpty().withMessage(emptyError),
];
