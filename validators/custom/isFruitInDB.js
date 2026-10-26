import { FRUITS_PATH } from "../../config.js";
import * as db from "../../db/queries.js";

export const isFruitInDB = async (inputFruit, { req, path }) => {
  const [fruit] = await db.getFruit(inputFruit);

  if (!fruit)
    throw new Error(
      `Unknown ${path}: ${inputFruit}. It does not exists. See ${req.protocol}://${req.get("host")}${FRUITS_PATH} for existing fruits.`,
    );

  return true;
};
