import { oneOf, query } from "express-validator";

const requiredError =
  "Select either peel, fruit, or both color(s) to search by.";
const emptyError = "must not be empty.";

export const validateColorSearch = [
  oneOf(
    [
      query("fruitColor")
        .trim()
        .notEmpty()
        .withMessage(`Fruit color search ${emptyError}`),
      query("peelColor")
        .trim()
        .notEmpty()
        .withMessage(`Peel color search ${emptyError}`),
    ],
    { message: requiredError, errorType: "flat" },
  ),
];
