"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const polls_route_1 = __importDefault(require("./routes/polls.route"));
const app = express_1.default();
// middlewares
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(polls_route_1.default);
app.listen(process.env.PORT || 3000);
console.log(`http://localhost:${process.env.PORT || 3000}`);
