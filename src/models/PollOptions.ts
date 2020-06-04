import { Poll } from "./Poll";
import { Option } from "./Option";

export class PollOptions extends Poll {
    options: Option[] | undefined;
}