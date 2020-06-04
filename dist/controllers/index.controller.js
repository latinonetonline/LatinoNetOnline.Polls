"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const database_1 = require("../database");
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query("SELECT * FROM \"public\".\"VersionInfo\"");
        return res.status(200).json(response.rows);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.pool.query(`SELECT * FROM \"public\".\"VersionInfo\" WHERE \"Version\" = ${req.params.id}`);
    return res.status(200).json(response.rows);
});
exports.createUser = (req, res) => {
    console.log(req.body);
    return res.status(200);
};
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.pool.query(`SELECT * FROM \"public\".\"VersionInfo\" WHERE \"Version\" = ${req.params.id}`);
    return res.status(200).json(response.rows);
});
