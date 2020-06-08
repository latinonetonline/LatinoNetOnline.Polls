"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePollRequest = void 0;
class CreatePollRequest {
    constructor(question, answers, eventId) {
        this.question = question;
        this.answers = answers;
        this.eventId = eventId;
    }
}
exports.CreatePollRequest = CreatePollRequest;
