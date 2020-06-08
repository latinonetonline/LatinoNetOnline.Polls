export class CreatePollRequest {
    constructor(question: string, answers: string[], eventId: string) {
        this.question = question;
        this.answers = answers;
        this.eventId = eventId;
    }
    question: string;
    answers: string[];
    eventId: string;
}