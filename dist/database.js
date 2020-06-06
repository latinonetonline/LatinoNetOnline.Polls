"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const config_1 = require("./utils/config");
exports.pool = new pg_1.Pool({
    user: config_1.PG_USER,
    host: config_1.PG_HOST,
    password: config_1.PG_PASSWORD,
    database: config_1.PG_DATABASE,
    port: config_1.PG_PORT
});
