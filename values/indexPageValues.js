import * as db from "../db/queries.js";
import { getPageValues } from "../utils/getPageValues.js";

const indexPage = {
  title: "Home",
  links: [
    { href: "/fruits", text: "View All Fruits" },
    { href: "/colors", text: "View All Colors" },
  ],
  getDBValues: async () => {
    const [fruitColorsResult, peelColorsResult] = await Promise.allSettled([
      db.getAllFreshFruitColors(),
      db.getAllFreshFruitPeelColors(),
    ]);
    const fruitColors =
      fruitColorsResult.status === "fulfilled" ? fruitColorsResult.value : null;
    const peelColors =
      peelColorsResult.status === "fulfilled" ? peelColorsResult.value : null;
    return { fruitColors, peelColors };
  },
};

export const getIndexPageValues = async () => {
  return getPageValues(indexPage);
};
