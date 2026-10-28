import * as db from "../db/queries.js";
import { getPageValues, splitCamelCase } from "../utils/aggregate.js";

const fruitColorsUpdatePage = {
  getDBValues: async (req) => {
    const { fruit, colorField } = req.params;

    const colorOpts =
      colorField === "fruitColor"
        ? await db.getAllUnusedFruitColorsByFruit(fruit)
        : await db.getAllUnusedPeelColorsByFruit(fruit);

    return { colorOpts };
  },

  getRequestValues: (req) => {
    const { fruit, colorField, color } = req.params;
    const formattedColorField = splitCamelCase(colorField);
    const lowerFormatted = formattedColorField.toLowerCase();
    const defaultOptionValue =
      req.method === "GET"
        ? `-- select a ${lowerFormatted} --`
        : req.body[colorField];

    const title = `Update ${formattedColorField} for ${fruit}`;

    return {
      title,
      fruit,
      colorField,
      color,
      colorFieldLabel: `New ${lowerFormatted}`,
      defaultOptionValue,
      buttonText: `Update ${lowerFormatted}`,
      fruitFormattedColorField: lowerFormatted,
    };
  },
};

export const getFruitColorsUpdatePageValues = async (req) => {
  return getPageValues(fruitColorsUpdatePage, req);
};
