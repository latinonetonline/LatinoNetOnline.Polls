"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH0_AUDIENCE = exports.AUTH0_ISSUER = exports.PG_PORT = exports.PG_DATABASE = exports.PG_PASSWORD = exports.PG_USER = exports.PG_HOST = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let path;
switch (process.env.NODE_ENV) {
    case "test":
        path = `${__dirname}/../../.env.test`;
        break;
    case "production":
        path = `${__dirname}/../../.env.production`;
        break;
    default:
        path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path: path });
exports.PG_HOST = process.env.PG_HOST;
exports.PG_USER = process.env.PG_USER;
exports.PG_PASSWORD = process.env.PG_PASSWORD;
exports.PG_DATABASE = process.env.PG_DATABASE;
exports.PG_PORT = parseInt(process.env.PG_PORT || '0');
exports.AUTH0_ISSUER = process.env.AUTH0_ISSUER;
exports.AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
