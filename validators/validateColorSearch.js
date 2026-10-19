import { oneOf, query } from "express-validator";

const requiredError =
  "Select either peel, fruit, or both color(s) to search by.";
const emptyError = "must not be empty.";

export const validateColorSearch = [
  oneOf(
    [
      query("searchFruitColor")
        .trim()
        .notEmpty()
        .withMessage(`Fruit color search ${emptyError}`),
      query("searchPeelColor")
        .trim()
        .notEmpty()
        .withMessage(`Peel color search ${emptyError}`),
    ],
    { message: requiredError, errorType: "flat" },
  ),
];
