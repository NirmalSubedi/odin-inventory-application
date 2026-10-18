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
