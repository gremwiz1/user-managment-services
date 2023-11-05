import { Pool } from 'pg';

const pool = new Pool({
  user: 'yourUsername',
  host: 'localhost',
  database: 'user_history_db',
  password: 'yourPassword',
  port: 5432,
});

export default pool;