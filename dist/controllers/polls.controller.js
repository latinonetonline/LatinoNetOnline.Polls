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
exports.deleteAllPolls = exports.deletePoll = exports.vote = exports.createPoll = exports.getResult = exports.getByEvent = exports.getPollById = exports.getPolls = void 0;
const Poll_1 = require("../models/Poll");
const CreatePollRequest_1 = require("../models/CreatePollRequest");
const PollOptionsResults_1 = require("../models/PollOptionsResults");
const Option_1 = require("../models/Option");
const uuid_1 = require("uuid");
const polls_service_1 = require("../services/polls.service");
const options_service_1 = require("../services/options.service");
const answers_service_1 = require("../services/answers.service");
const OperationResponse_1 = require("../models/OperationResponse");
const OperationResponseResult_1 = require("../models/OperationResponseResult");
const pollService = new polls_service_1.PollService();
const optionService = new options_service_1.OptionService();
const answerService = new answers_service_1.AnswerService();
exports.getPolls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const polls = yield pollService.getAll();
        return res.status(200).json(new OperationResponseResult_1.OperationResponseResult(polls));
    }
    catch (error) {
        return res.status(500).json(new OperationResponse_1.OperationResponse(false, error));
    }
});
exports.getPollById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json(new OperationResponse_1.OperationResponse(false, "Id Invalido"));
        }
        const poll = yield pollService.getById(id);
        if (poll) {
            return res.status(200).json(new OperationResponseResult_1.OperationResponseResult(poll));
        }
        else {
            return res.status(404).json(new OperationResponse_1.OperationResponse(false, "No existe un Poll con ese Id"));
        }
    }
    catch (error) {
        return res.status(500).json(new OperationResponse_1.OperationResponse(false, error));
    }
});
exports.getByEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        const polls = yield pollService.getByEventId(eventId);
        return res.status(200).json(new OperationResponseResult_1.OperationResponseResult(polls));
    }
    catch (error) {
        return res.status(500).json(new OperationResponse_1.OperationResponse(false, error));
    }
});
exports.getResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pollId = req.params.id;
        if (!pollId) {
            return res.status(400).json(new OperationResponse_1.OperationResponse(false, "pollId Invalido"));
        }
        const poll = yield pollService.getById(pollId);
        if (poll) {
            const options = yield optionService.getOptionsWithVotes(pollId);
            const result = new PollOptionsResults_1.PollOptionsResults(poll, options);
            return res.status(200).json(new OperationResponseResult_1.OperationResponseResult(result));
        }
        else {
            return res.status(400).json(new OperationResponse_1.OperationResponse(false, "pollId Invalido"));
        }
    }
    catch (error) {
        return res.status(500).json(new OperationResponse_1.OperationResponse(false, error));
    }
});
exports.createPoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = new CreatePollRequest_1.CreatePollRequest(req.body.question, req.body.answers, req.body.eventId);
        if (!request.eventId) {
            return res.status(400).json(new OperationResponse_1.OperationResponse(false, "eventId Invalido"));
        }
        if (!request.question) {
            return res.status(400).json(new OperationResponse_1.OperationResponse(false, "question Invalido"));
        }
        if (!request.answers || request.answers.length < 4) {
            return res.status(400).json(new OperationResponse_1.OperationResponse(false, "answers Invalido"));
        }
        for (const answer of request.answers) {
            if (!answer) {
                return res.status(400).json(new OperationResponse_1.OperationResponse(false, "answers Invalido"));
            }
        }
        const options = [];
        const poll = new Poll_1.Poll();
        poll.eventId = request.eventId;
        poll.question = request.question;
        poll.pollId = uuid_1.v4();
        for (const answer of request.answers) {
            const option = new Option_1.Option();
            option.text = answer;
            option.optionId = uuid_1.v4();
            option.pollId = poll.pollId;
            options.push(option);
        }
        yield pollService.createPoll(poll);
        for (const option of options) {
            yield optionService.createOption(option);
        }
        return res.status(200).json(new OperationResponseResult_1.OperationResponseResult({ poll: poll, options: options }));
    }
    catch (error) {
        return res.status(500).json(new OperationResponse_1.OperationResponse(false, error));
    }
});
exports.vote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const optionId = req.params.optionId;
        if (!optionId) {
            return res.status(400).json(new OperationResponse_1.OperationResponse(false, 'optionId Invalido'));
        }
        yield answerService.createAnswer(optionId);
        return res.status(200).json(new OperationResponse_1.OperationResponse(true, ''));
    }
    catch (error) {
        return res.status(500).json(new OperationResponse_1.OperationResponse(false, error));
    }
});
exports.deletePoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pollId = req.params.id;
        if (!pollId) {
            return res.status(400).json(new OperationResponse_1.OperationResponse(false, 'id Invalido'));
        }
        const poll = yield pollService.getById(pollId);
        if (!poll) {
            return res.status(400).json(new OperationResponse_1.OperationResponse(false, "pollId Invalido"));
        }
        yield optionService.deleteOptionByPoll(pollId);
        yield pollService.deletePoll(pollId);
        return res.status(200).json(new OperationResponse_1.OperationResponse(true, ''));
    }
    catch (error) {
        return res.status(500).json(new OperationResponse_1.OperationResponse(false, error));
    }
});
exports.deleteAllPolls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield answerService.deleteAll();
        yield optionService.deleteAll();
        yield pollService.deleteAll();
        return res.status(200).json(new OperationResponse_1.OperationResponse(true, ''));
    }
    catch (error) {
        return res.status(500).json(new OperationResponse_1.OperationResponse(false, error));
    }
});
