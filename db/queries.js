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
  SELECT fresh.css_named_color AS fruit_colors, peel.css_named_color AS peel_colors
  FROM fruits 
  JOIN fresh_fruit_colors AS fresh ON fresh.fruit = fruits.fruit AND fruits.fruit ILIKE $1
  JOIN fresh_fruit_peel_colors AS peel ON peel.fruit = fruits.fruit`;

  const params = [fruit];
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
