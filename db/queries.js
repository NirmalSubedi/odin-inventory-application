import { COLORS_DELIMITER } from "../config.js";
import { pool } from "./pool.js";

export const getAllColors = async () => {
  const queryText = `
  SELECT css_named_color 
  FROM css_named_colors`;

  const { rows } = await pool.query(queryText);
  return rows;
};

export const getAllFruits = async () => {
  const queryText = `
  SELECT fruit 
  FROM fruits`;

  const { rows } = await pool.query(queryText);
  return rows;
};

export const getColorsOfFruit = async (fruit) => {
  const queryText = `
  SELECT fresh.fruit,
    STRING_AGG(DISTINCT fresh.css_named_color, $2) AS fruit_colors,
    STRING_AGG(DISTINCT peel.css_named_color, $2) AS peel_colors
  FROM fruits
    JOIN fresh_fruit_colors AS fresh 
      ON fresh.fruit = fruits.fruit 
      AND fruits.fruit ILIKE $1
    JOIN fresh_fruit_peel_colors AS peel 
      ON peel.fruit = fruits.fruit
  GROUP BY fresh.fruit`;
  const values = [fruit, COLORS_DELIMITER];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const getAllFreshFruitColors = async () => {
  const queryText = `
  SELECT DISTINCT css_named_color 
  FROM fresh_fruit_colors`;

  const { rows } = await pool.query(queryText);
  return rows;
};

export const getAllFreshFruitPeelColors = async () => {
  const queryText = `
  SELECT DISTINCT css_named_color 
  FROM fresh_fruit_peel_colors`;

  const { rows } = await pool.query(queryText);
  return rows;
};

export const getAllFruitsByFreshFruitColor = async (fruitColor) => {
  const queryText = `
  SELECT fruit 
  FROM fresh_fruit_colors 
  WHERE css_named_color ILIKE $1`;
  const values = [fruitColor];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const getAllFruitsByFreshFruitPeelColor = async (peelColor) => {
  const queryText = `
  SELECT fruit 
  FROM fresh_fruit_peel_colors 
  WHERE css_named_color ILIKE $1`;
  const values = [peelColor];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const getAllFruitsByFreshFruitAndPeelColors = async (
  fruitColor,
  peelColor,
) => {
  const queryText = `
  SELECT fresh.fruit 
  FROM fresh_fruit_peel_colors AS peel
  JOIN fresh_fruit_colors AS fresh 
    ON peel.fruit ILIKE fresh.fruit
    AND fresh.css_named_color ILIKE $1 
    AND peel.css_named_color ILIKE $2
  `;
  const values = [fruitColor, peelColor];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const getColor = async (color) => {
  const queryText = `
  SELECT css_named_color 
  FROM css_named_colors 
  WHERE css_named_color ILIKE $1`;
  const values = [color];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const getFruit = async (fruit) => {
  const queryText = `
  SELECT fruit 
  FROM fruits 
  WHERE fruit ILIKE $1`;
  const values = [fruit];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const setFruit = async (fruit, fruitColor, peelColor) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const insertFruit = `
    INSERT INTO fruits
    (fruit) VALUES ($1)`;
    const insertFruitValues = [fruit];
    await client.query(insertFruit, insertFruitValues);

    const insertFruitColor = `
    INSERT INTO fresh_fruit_colors 
    (fruit, css_named_color) VALUES ($1, $2)`;
    const insertFruitColorValues = [fruit, fruitColor];
    await client.query(insertFruitColor, insertFruitColorValues);

    const insertPeelColor = `
    INSERT INTO fresh_fruit_peel_colors
    (fruit, css_named_color) VALUES ($1, $2)`;
    const insertPeelColorValues = [fruit, peelColor];
    await client.query(insertPeelColor, insertPeelColorValues);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};
