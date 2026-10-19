import { NotFoundError } from "../errors/NotFoundError.js";
import * as db from "../db/queries.js";
import { validateColorSearch } from "../validators/validateColorSearch.js";
import { matchedData, validationResult } from "express-validator";
import { BAD_REQUEST } from "../config.js";
import { getIndexPageValues } from "../values/indexPageValues.js";

export const getColorsPage = async (req, res) => {
  const colors = await db.getAllColors();
  res.render("colors", { title: "All Colors", colors });
};

export const getSearchColor = [
  validateColorSearch,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { title, ...rest } = await getIndexPageValues();
      return res.status(BAD_REQUEST).render("index", {
        ...rest,
        title: `Error: ${title}`,
        errors: errors.array(),
      });
    }

    const { fruitColor, peelColor } = matchedData(req);

    let fruits;
    if (fruitColor && peelColor) {
      fruits = await db.getAllFruitsByFreshFruitAndPeelColors(
        fruitColor,
        peelColor,
      );
    } else if (fruitColor) {
      fruits = await db.getAllFruitsByFreshFruitColor(fruitColor);
    } else {
      fruits = await db.getAllFruitsByFreshFruitPeelColor(peelColor);
    }

    res.render("fruits", {
      title: `Found Fresh Fruits with`,
      fruits,
      fruitColor,
      peelColor,
    });
  },
];

export const respondWithMissingColor = (req, res) => {
  throw new NotFoundError("Color not found.");
};
