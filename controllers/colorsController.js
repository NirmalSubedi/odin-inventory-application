import { NotFoundError } from "../errors/NotFoundError.js";
import * as db from "../db/queries.js";

const links = [{ href: "/", text: "Go Home" }];

export const getColorsPage = async (req, res) => {
  const colors = await db.getAllColors();
  res.render("colors", { title: "All Colors", colors, links });
};

export const respondWithMissingColor = (req, res) => {
  throw new NotFoundError("Color not found.");
};
