import { COLORS_PATH } from "../../config.js";
import * as db from "../../db/queries.js";

export const isColorInDB = async (inputColor, { req, path }) => {
  const color = await db.getColor(inputColor);
  if (color.length === 0)
    throw new Error(
      `Unknown ${path}: ${inputColor}. See ${req.protocol}://${req.get("host")}${COLORS_PATH} for available colors.`,
    );
  return true;
};
