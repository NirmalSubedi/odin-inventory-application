import { FRUITS_PATH } from "../../config.js";
import * as db from "../../db/queries.js";

export const isFruitNotInDB = async (inputFruit, { req, path }) => {
  const [fruit] = await db.getFruit(inputFruit);

  if (fruit)
    throw new Error(
      `Duplicate ${path}: ${inputFruit}. It already exists. See ${req.protocol}://${req.get("host")}${FRUITS_PATH} for existing fruits.`,
    );

  return true;
};
