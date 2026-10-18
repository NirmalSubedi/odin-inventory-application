import { NotFoundError } from "../errors/NotFoundError.js";

const links = [
  { href: "/fruits", text: "View Fruits" },
  { href: "/colors", text: "View Colors" },
];

export const getIndexPage = (req, res) => {
  res.render("index", { title: "Home", links });
};

export const respondWithMissingResource = (req, res) => {
  throw new NotFoundError("Page not found");
};
