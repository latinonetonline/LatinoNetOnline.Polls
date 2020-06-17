export class Poll {
    [x: string]: any;
    constructor() {
        this.pollId = '';
        this.question = '';
    }
    pollId: string;
    question: string;
}