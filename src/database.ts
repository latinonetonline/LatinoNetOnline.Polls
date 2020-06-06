import { Pool } from "pg";
import { PG_HOST, PG_USER, PG_PASSWORD, PG_DATABASE, PG_PORT } from './utils/config';

export const pool = new Pool({
    user: PG_USER,
    host: PG_HOST,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    port: PG_PORT
})