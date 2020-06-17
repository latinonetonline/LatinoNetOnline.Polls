import { Poll } from "./Poll";
import { Option } from "./Option";

export class PollOptions extends Poll {
    constructor(poll: Poll, options: Option[]) {
        super();
        this.pollId = poll.pollId;
        this.question = poll.question;
        this.options = options;
    }
    options: Option[];
}