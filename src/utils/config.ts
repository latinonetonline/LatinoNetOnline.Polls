import * as dotenv from "dotenv";

let path;
switch (process.env.NODE_ENV) {
  case "development":
    path = `${__dirname}/../../.env.development`;
    break;
}

dotenv.config({ path: path });

export const PG_HOST = process.env.PG_HOST;
export const PG_USER = process.env.PG_USER;
export const PG_PASSWORD = process.env.PG_PASSWORD;
export const PG_DATABASE = process.env.PG_DATABASE;
export const PG_PORT:number = parseInt(process.env.PG_PORT || '0');

export const AUTH0_ISSUER = process.env.AUTH0_ISSUER;
export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
