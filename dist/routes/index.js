"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const polls_controller_1 = require("../controllers/polls.controller");
const authz_middleware_ts_1 = require("../middlewares/authz.middleware.ts");
const router = express_1.Router();
router.get('/api/polls', polls_controller_1.getPolls);
router.get('/api/polls/:id', polls_controller_1.getPollById);
router.get('/api/polls/getByEvent/:eventId', polls_controller_1.getByEvent);
router.get('/api/polls/GetResult/:id', polls_controller_1.getResult);
router.post('/api/polls', [authz_middleware_ts_1.checkJwt], polls_controller_1.createPoll);
router.delete('/api/polls/:id', [authz_middleware_ts_1.checkJwt], polls_controller_1.deletePoll);
router.patch('/api/polls/vote/:optionId', polls_controller_1.vote);
exports.default = router;
