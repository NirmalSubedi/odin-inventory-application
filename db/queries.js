import { COLORS_DELIMITER } from "../config.js";
import { pool } from "./pool.js";

export const getAllColors = async () => {
  const sql = "SELECT css_named_color FROM css_named_colors";
  const { rows } = await pool.query(sql);
  return rows;
};

export const getAllFruits = async () => {
  const sql = "SELECT fruit FROM fruits";
  const { rows } = await pool.query(sql);
  return rows;
};

export const getColorsOfFruit = async (fruit) => {
  const sql = `
  SELECT fresh.fruit,
   STRING_AGG(DISTINCT fresh.css_named_color, $2) AS fruit_colors,
   STRING_AGG(DISTINCT peel.css_named_color, $2) AS peel_colors
  FROM fruits
    JOIN fresh_fruit_colors AS fresh ON fresh.fruit = fruits.fruit AND fruits.fruit ILIKE $1
    JOIN fresh_fruit_peel_colors AS peel ON peel.fruit = fruits.fruit
  group by fresh.fruit
  `;

  const params = [fruit, COLORS_DELIMITER];
  const { rows } = await pool.query(sql, params);
  return rows;
};

export const getAllFreshFruitColors = async () => {
  const sql = `SELECT DISTINCT css_named_color FROM fresh_fruit_colors`;
  const { rows } = await pool.query(sql);
  return rows;
};

export const getAllFreshFruitPeelColors = async () => {
  const sql = `SELECT DISTINCT css_named_color FROM fresh_fruit_peel_colors`;
  const { rows } = await pool.query(sql);
  return rows;
};

export const getAllFruitsByFreshFruitColor = async (fruitColor) => {
  const sql = `SELECT fruit FROM fresh_fruit_colors WHERE css_named_color ILIKE $1`;
  const params = [fruitColor];
  const { rows } = await pool.query(sql, params);
  return rows;
};

export const getAllFruitsByFreshFruitPeelColor = async (peelColor) => {
  const sql = `SELECT fruit FROM fresh_fruit_peel_colors WHERE css_named_color ILIKE $1`;
  const params = [peelColor];
  const { rows } = await pool.query(sql, params);
  return rows;
};

export const getAllFruitsByFreshFruitAndPeelColors = async (
  fruitColor,
  peelColor,
) => {
  const sql = `
  SELECT fresh.fruit 
  FROM fresh_fruit_peel_colors AS peel
  JOIN fresh_fruit_colors AS fresh 
  ON fresh.css_named_color ILIKE $1 
  AND peel.css_named_color ILIKE $2
  `;

  const params = [fruitColor, peelColor];
  const { rows } = await pool.query(sql, params);
  return rows;
};

export const getColor = async (color) => {
  const sql = `SELECT css_named_color FROM css_named_colors WHERE css_named_color ILIKE $1`;
  const params = [color];
  const { rows } = await pool.query(sql, params);
  return rows;
};

export const getFruit = async (fruit) => {
  const sql = `SELECT fruit FROM fruits WHERE fruit ILIKE $1`;
  const params = [fruit];
  const { rows } = await pool.query(sql, params);
  return rows;
};

export const setFruit = async (fruit, fruitColor, peelColor) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const insertFruit = `INSERT INTO fruits(fruit) VALUES ($1)`;
    await client.query(insertFruit, [fruit]);

    const insertFruitColor = `insert into fresh_fruit_colors(fruit, css_named_color) values ($1, $2)`;
    await client.query(insertFruitColor, [fruit, fruitColor]);

    const insertPeelColor = `insert into fresh_fruit_peel_colors(fruit, css_named_color) values ($1, $2)`;
    await client.query(insertPeelColor, [fruit, peelColor]);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
