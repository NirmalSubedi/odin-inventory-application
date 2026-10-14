import { Pool } from "pg";
import { connectionString } from "../config.js";

export const pool = new Pool({ connectionString });
