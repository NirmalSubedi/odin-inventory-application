import * as db from "../db/queries.js";
import { splitCamelCase, getPageValues } from "../utils/aggregate.js";

const fruitColorsCreationPage = {
  getRequestValues: (req) => {
    const { fruit, colorField } = req.params;
    const field = splitCamelCase(colorField);
    const selectOption = req.body?.[colorField];

    return {
      fruit,
      field,
      colorField,
      title: `Add ${field} for ${fruit}`,
      colorFieldLabel: `${field}:`,
      defaultOptionValue: `-- Select a ${field} --`,
      selectOption,
      buttonText: `Add ${field}`,
      errorIds: [`createFruitColorError`, `${colorField}Error`],
    };
  },

  getDBValues: async (req) => {
    const { fruit, colorField } = req.params;
    let colorOpts;
    if (colorField === "fruitColor") {
      colorOpts = await db.getAllUnusedFruitColorsByFruit(fruit);
    } else if (colorField === "peelColor") {
      colorOpts = await db.getAllUnusedFruitColorsByFruit(fruit);
    }
    return { colorOpts };
  },
};

export const getFruitColorsCreationValues = async (req) => {
  return getPageValues(fruitColorsCreationPage, req);
};
