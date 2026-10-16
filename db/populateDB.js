import fs from "node:fs/promises";
import path from "node:path";
import { Client } from "pg";
import { connectionString } from "../config.js";

const colorsPath = path.join(import.meta.dirname, "colors.txt");
const colors = (await fs.readFile(colorsPath, "utf8"))
  .split("\n")
  .map((str) => `('${str}')`)
  .join(", ");

const SQL = `
CREATE TABLE IF NOT EXISTS fruits (
  fruit TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS css_named_colors(
  css_named_color TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS fresh_fruit_colors (
  fruit TEXT REFERENCES fruits ON DELETE CASCADE ON UPDATE CASCADE,
  css_named_color TEXT REFERENCES css_named_colors ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY(fruit, css_named_color)
);

CREATE TABLE IF NOT EXISTS fresh_fruit_peel_colors (
  fruit TEXT REFERENCES fruits ON DELETE CASCADE ON UPDATE CASCADE,
  css_named_color TEXT REFERENCES css_named_colors ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY(fruit, css_named_color)
);

INSERT INTO css_named_colors (css_named_color) 
VALUES ${colors};
`;

async function main() {
  console.log("seeding...");
  const client = new Client({ connectionString });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
