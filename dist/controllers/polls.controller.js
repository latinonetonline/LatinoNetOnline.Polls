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
exports.deletePoll = exports.vote = exports.createPoll = exports.getResult = exports.getByEvent = exports.getPollById = exports.getPolls = void 0;
const database_1 = require("../database");
const Poll_1 = require("../models/Poll");
const CreatePollRequest_1 = require("../models/CreatePollRequest");
const PollOptionsResults_1 = require("../models/PollOptionsResults");
const Option_1 = require("../models/Option");
const uuid_1 = require("uuid");
exports.getPolls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.pool.query("SELECT * FROM \"public\".\"Polls\"");
    return res.status(200).json(response.rows);
});
exports.getPollById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.pool.query(`SELECT * FROM \"public\".\"Polls\" WHERE \"PollId\" = '${req.params.id}'`);
    if (response.rows.length) {
        return res.status(200).json(response.rows);
    }
    else {
        return res.status(404).json();
    }
});
exports.getByEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.pool.query(`SELECT * FROM \"public\".\"Polls\" WHERE \"EventId\" = '${req.params.eventId}'`);
    return res.status(200).json(response.rows);
});
exports.getResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pollId = req.params.id;
    const responsePoll = yield database_1.pool.query(`SELECT * FROM \"public\".\"Polls\" WHERE \"PollId\" = '${pollId}'`);
    const responseAnswer = yield database_1.pool.query(`SELECT \"public\".\"Options\".*, (select  Count(*) from \"public\".\"Answers\" WHERE \"public\".\"Options\".\"OptionId\" = \"public\".\"Answers\".\"OptionId\") AS Votes
    FROM \"public\".\"Options\" 
    WHERE \"public\".\"Options\".\"PollId\" = '${pollId}';`);
    const result = new PollOptionsResults_1.PollOptionsResults();
    result.options = responseAnswer.rows;
    result.poll = responsePoll.rows[0];
    return res.status(200).json(result);
});
exports.createPoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = new CreatePollRequest_1.CreatePollRequest();
    request.answer1 = req.body.answer1;
    request.answer2 = req.body.answer2;
    request.answer3 = req.body.answer3;
    request.answer4 = req.body.answer4;
    request.question = req.body.question;
    request.eventId = req.body.eventId;
    const options = [];
    const poll = new Poll_1.Poll();
    poll.eventId = request.eventId;
    poll.question = request.question;
    poll.pollId = uuid_1.v4();
    if (request.answer1 && request.answer1.length > 0) {
        const option = new Option_1.Option();
        option.text = request.answer1;
        option.optionId = uuid_1.v4();
        option.pollId = poll.pollId;
        options.push(option);
    }
    if (request.answer2 && request.answer2.length > 0) {
        const option = new Option_1.Option();
        option.text = request.answer2;
        option.optionId = uuid_1.v4();
        option.pollId = poll.pollId;
        options.push(option);
    }
    if (request.answer3 && request.answer3.length > 0) {
        const option = new Option_1.Option();
        option.text = request.answer3;
        option.optionId = uuid_1.v4();
        option.pollId = poll.pollId;
        options.push(option);
    }
    if (request.answer4 && request.answer4.length > 0) {
        const option = new Option_1.Option();
        option.text = request.answer4;
        option.optionId = uuid_1.v4();
        option.pollId = poll.pollId;
        options.push(option);
    }
    yield database_1.pool.query(`INSERT INTO \"public\".\"Polls\" ("PollId", "Question", "EventId") VALUES ($1, $2, $3);`, [poll.pollId, poll.question, poll.eventId]);
    for (const option of options) {
        yield database_1.pool.query(`INSERT INTO \"public\".\"Options\" ("OptionId", "Text", "PollId") VALUES ($1,$2,$3);`, [option.optionId, option.text, option.pollId]);
    }
    return res.status(200).json({ poll: poll, options: options });
});
exports.vote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.pool.query(`INSERT INTO \"public\".\"Answers\" (\"OptionId\") VALUES ('${req.params.optionId}')`);
    return res.status(200).json();
});
exports.deletePoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.pool.query(`DELETE FROM \"public\".\"Options\" WHERE \"PollId\" = '${req.params.id}'`);
    yield database_1.pool.query(`DELETE FROM \"public\".\"Polls\" WHERE \"PollId\" = '${req.params.id}'`);
    return res.status(200).json();
});
