"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionVotes = void 0;
const Option_1 = require("./Option");
class OptionVotes extends Option_1.Option {
    constructor() {
        super();
        this.votes = 0;
    }
}
exports.OptionVotes = OptionVotes;
