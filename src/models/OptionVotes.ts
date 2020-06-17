import { Option } from "./Option";

export class OptionVotes extends Option {
    constructor() {
        super()
        this.votes = 0;
    }
    votes: number;
}