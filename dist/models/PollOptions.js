"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollOptions = void 0;
const Poll_1 = require("./Poll");
class PollOptions extends Poll_1.Poll {
    constructor(poll, options) {
        super();
        this.pollId = poll.pollId;
        this.question = poll.question;
        this.options = options;
    }
}
exports.PollOptions = PollOptions;
