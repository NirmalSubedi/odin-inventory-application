import { NotFoundError } from "../errors/NotFoundError.js";
import * as db from "../db/queries.js";
import { getIndexPageValues } from "../values/indexPageValues.js";

export const getIndexPage = async (req, res) => {
  const [fruitColorsResult, peelColorsResult] = await Promise.allSettled([
    db.getAllFreshFruitColors(),
    db.getAllFreshFruitPeelColors(),
  ]);
  const fruitColors =
    fruitColorsResult.status === "fulfilled" ? fruitColorsResult.value : null;
  const peelColors =
    peelColorsResult.status === "fulfilled" ? peelColorsResult.value : null;

  res.render("index", await getIndexPageValues());
};

export const respondWithMissingResource = (req, res) => {
  throw new NotFoundError("Page not found");
};
