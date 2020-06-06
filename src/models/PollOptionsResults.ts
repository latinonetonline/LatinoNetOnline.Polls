import { Poll } from "./Poll";
import { OptionVotes } from "./OptionVotes";

export class PollOptionsResults {
    poll: Poll | undefined;
    options: OptionVotes[] | undefined;
}