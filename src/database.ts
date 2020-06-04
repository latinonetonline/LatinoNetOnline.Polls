import { Pool } from "pg";

export const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    password: 'secret',
    database: 'postgres',
    port: 5432
})