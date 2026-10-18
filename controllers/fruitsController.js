import { NotFoundError } from "../errors/NotFoundError.js";
import * as db from "../db/queries.js";
import { removeDuplicateKeys } from "../utils/removeDuplicateKeys.js";

const links = [{ href: "/", text: "Go Home" }];
export const getFruitsPage = async (req, res) => {
  const fruits = await db.getAllFruits();
  res.render("fruits", { title: "All Fruits", fruits, links });
};

export const getFruitDetails = async (req, res) => {
  const { fruit } = req.params;
  let fruitDetails = (await db.getFruitColors(fruit)).reduce(
    removeDuplicateKeys,
    {},
  );
  fruitDetails = Object.entries(fruitDetails);
  console.log(fruitDetails);
  res.render("fruit-details", {
    title: `Fresh Colors for ${fruit}`,
    fruit,
    fruitDetails,
  });
};

export const respondWithMissingFruit = (req, res) => {
  throw new NotFoundError("Fruit not found.");
};
