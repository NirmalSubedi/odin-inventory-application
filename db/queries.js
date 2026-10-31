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
  WHERE css_named_color = $1`;
  const values = [fruitColor];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const getAllFruitsByFreshFruitPeelColor = async (peelColor) => {
  const queryText = `
  SELECT fruit 
  FROM fresh_fruit_peel_colors 
  WHERE css_named_color = $1`;
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
    ON peel.fruit = fresh.fruit
    AND fresh.css_named_color = $1 
    AND peel.css_named_color = $2
  `;
  const values = [fruitColor, peelColor];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const getColor = async (color) => {
  const queryText = `
  SELECT css_named_color 
  FROM css_named_colors 
  WHERE css_named_color = $1`;
  const values = [color];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const getFruit = async (fruit) => {
  const queryText = `
  SELECT fruit 
  FROM fruits 
  WHERE fruit = $1`;
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

export const getAllUnusedFruitColorsByFruit = async (fruit) => {
  const queryText = `
  SELECT css_named_color
  FROM css_named_colors
  WHERE css_named_color
    NOT IN (SELECT css_named_color
            FROM fresh_fruit_colors
            WHERE fruit = $1)`;
  const values = [fruit];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const getAllUnusedPeelColorsByFruit = async (fruit) => {
  const queryText = `
  SELECT css_named_color
  FROM css_named_colors
  WHERE css_named_color
    NOT IN (SELECT css_named_color 
            FROM fresh_fruit_peel_colors
            WHERE fruit = $1)`;
  const values = [fruit];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const setFreshFruitColorsByFruitAndColor = async (fruit, color) => {
  const queryText = `
  INSERT INTO fresh_fruit_colors(fruit, css_named_color) 
  VALUES ($1, $2) 
  ON CONFLICT DO NOTHING`;
  const values = [fruit, color];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const setFreshFruitPeelColorsByFruitAndColor = async (fruit, color) => {
  const queryText = `
  INSERT INTO fresh_fruit_peel_colors(fruit, css_named_color) 
  VALUES ($1, $2) 
  ON CONFLICT DO NOTHING`;
  const values = [fruit, color];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const updateFruitName = async (oldName, newName) => {
  const queryText = `
  UPDATE fruits 
  SET fruit = $2
  WHERE fruit = $1`;
  const values = [oldName, newName];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const updateFruitColor = async (fruit, oldColor, newColor) => {
  const queryText = `
  UPDATE fresh_fruit_colors 
  SET css_named_color = $3
  WHERE fruit = $1
    AND css_named_color = $2`;
  const values = [fruit, oldColor, newColor];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const updatePeelColor = async (fruit, oldColor, newColor) => {
  const queryText = `
  UPDATE fresh_fruit_peel_colors 
  SET css_named_color = $3
  WHERE fruit = $1
    AND css_named_color = $2`;
  const values = [fruit, oldColor, newColor];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const getAllFreshFruitColorsByFruit = async (fruit) => {
  const queryText = `
  SELECT STRING_AGG(css_named_color, $2) as fruit_colors
  FROM fresh_fruit_colors
  WHERE fruit = $1`;
  const values = [fruit, COLORS_DELIMITER];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const getAllFreshPeelColorsByFruit = async (fruit) => {
  const queryText = `
  SELECT STRING_AGG(css_named_color, $2) as peel_colors
  FROM fresh_fruit_peel_colors
  WHERE fruit = $1`;
  const values = [fruit, COLORS_DELIMITER];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const deleteFruit = async (fruit) => {
  const queryText = `
  DELETE FROM fruits 
  WHERE fruit = $1`;
  const values = [fruit];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const deleteFruitColorOfFruit = async (fruit, fruitColor) => {
  const queryText = `
  DELETE FROM fresh_fruit_colors 
  WHERE fruit = $1
    AND css_named_color = $2`;
  const values = [fruit, fruitColor];

  const { rows } = await pool.query(queryText, values);
  return rows;
};

export const deletePeelColorOfFruit = async (fruit, peelColor) => {
  const queryText = `
  DELETE FROM fresh_fruit_peel_colors 
  WHERE fruit = $1
    AND css_named_color = $2`;
  const values = [fruit, peelColor];

  const { rows } = await pool.query(queryText, values);
  return rows;
};
