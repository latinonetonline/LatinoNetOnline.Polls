import { Poll } from "./Poll";
import { OptionVotes } from "./OptionVotes";

export class PollOptionsResults {
    constructor(poll: Poll, options: OptionVotes[]) {
        this.poll = poll;
        this.options = options;
    }

    poll: Poll;
    options: OptionVotes[];
}