import { NotFoundError } from "../errors/NotFoundError.js";
import { getIndexPageValues } from "../values/aggregate.js";

export const getIndexPage = async (req, res) => {
  res.render("index", await getIndexPageValues());
};

export const respondWithMissingResource = (req, res) => {
  throw new NotFoundError("Page not found");
};
