import { COLORS_DELIMITER } from "../config.js";
import * as db from "../db/queries.js";
import { getPageValues } from "../utils/getPageValues.js";

const fruitDetailsPage = {
  delimiter: COLORS_DELIMITER,

  getRequestValues: (req) => {
    const { fruit } = req.params;

    return {
      title: `Fresh Colors for ${fruit}`,
      fruit,
    };
  },

  getDBValues: async (req) => {
    const { fruit } = req.params;

    const [fruitRes, fruitColorsRes, peelColorsRes] = await Promise.allSettled([
      db.getFruit(fruit),
      db.getAllFreshFruitColorsByFruit(fruit),
      db.getAllFreshPeelColorsByFruit(fruit),
    ]);

    const [fruit_colors] =
      fruitColorsRes.status === "fulfilled" ? fruitColorsRes.value : null;
    const [peel_colors] =
      peelColorsRes.status === "fulfilled" ? peelColorsRes.value : null;
    const [storedFruit] =
      fruitRes.status === "fulfilled" ? fruitRes.value : null;

    const fruitDetails = { ...fruit_colors, ...peel_colors };
    return { fruitDetails, doesFruitExist: Boolean(storedFruit) };
  },
};

export const getFruitDetailsPageValues = async (req) => {
  return getPageValues(fruitDetailsPage, req);
};
