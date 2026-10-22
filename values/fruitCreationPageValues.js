import * as db from "../db/queries.js";
import { getPageValue } from "./utils/getPageValue.js";

const fruitCreationPage = {
  title: "Create Fruit",
  loader: async () => {
    const colors = await db.getAllColors();
    return {
      fruitColors: colors,
      peelColors: colors,
    };
  },
};

export const getFruitCreationPageValues = async () => {
  return getPageValue(fruitCreationPage);
};
