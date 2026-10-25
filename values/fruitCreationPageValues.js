import * as db from "../db/queries.js";
import { getPageValues } from "../utils/getPageValues.js";

const fruitCreationPage = {
  title: "Create Fruit",
  getDBValues: async () => {
    const colors = await db.getAllColors();
    return {
      fruitColors: colors,
      peelColors: colors,
    };
  },
};

export const getFruitCreationPageValues = async () => {
  return getPageValues(fruitCreationPage);
};
