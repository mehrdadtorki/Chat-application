// lib/db.js
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Ignore self-signed certificate errors
  },
});

export default pool;
