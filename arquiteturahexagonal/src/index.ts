import dotenv from 'dotenv';

dotenv.config();

import menuPrincipal from './app/menu/menuPrincipal';
import { pool } from './adapter/db/db';

async function main() {
  try {
    await menuPrincipal();
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
}

main();
