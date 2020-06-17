import { Request, Response } from "express";
import { Poll } from "../models/Poll";
import { CreatePollRequest } from "../models/CreatePollRequest";
import { PollOptionsResults } from "../models/PollOptionsResults";
import { Option } from "../models/Option";
import { v4 as uuidv4 } from 'uuid';
import { PollService } from '../services/polls.service';
import { OptionService } from '../services/options.service';
import { AnswerService } from "../services/answers.service";
import { OperationResponse } from "../models/OperationResponse";
import { OperationResponseResult } from "../models/OperationResponseResult";
import { PollOptions } from "../models/PollOptions";

const pollService = new PollService();
const optionService = new OptionService();
const answerService = new AnswerService();

export const getPolls = async (req: Request, res: Response): Promise<Response<Poll[]>> => {
    try {
        const pollOptionsArray: PollOptions[] = []
        const polls = await pollService.getAll();
        for (const poll of polls) {

            const options = await optionService.getByPoll(poll.pollId);

            const pollOptions = new PollOptions(poll, options);

            pollOptionsArray.push(pollOptions);
        }

        return res.status(200).json(new OperationResponseResult(pollOptionsArray));

    } catch (error) {
        return res.status(500).json(new OperationResponse(false, error));
    }

}

export const getPollById = async (req: Request, res: Response): Promise<Response<Poll[]>> => {
    try {

        const id: string = req.params.id;
        if (!id) {
            return res.status(400).json(new OperationResponse(false, "Id Invalido"));
        }
        const poll = await pollService.getById(id);

        if (poll == null) {
            return res.status(400).json(new OperationResponse(false, "Poll Dont Exist"));
        }

        const options = await optionService.getByPoll(id);
        const pollOptions = new PollOptions(poll, options);

        if (poll) {
            return res.status(200).json(new OperationResponseResult(pollOptions));
        }
        else {
            return res.status(404).json(new OperationResponse(false, "No existe un Poll con ese Id"));
        }

    } catch (error) {
        return res.status(500).json(new OperationResponse(false, error));
    }
}

export const getResult = async (req: Request, res: Response): Promise<Response> => {
    try {

        const pollId = req.params.id;
        if (!pollId) {
            return res.status(400).json(new OperationResponse(false, "pollId Invalido"));
        }

        const poll = await pollService.getById(pollId);

        if (poll) {
            const options = await optionService.getOptionsWithVotes(pollId);

            const result = new PollOptionsResults(poll, options);

            return res.status(200).json(new OperationResponseResult(result));
        }
        else {
            return res.status(400).json(new OperationResponse(false, "pollId Invalido"));
        }

    } catch (error) {
        return res.status(500).json(new OperationResponse(false, error));
    }
}

export const createPoll = async (req: Request, res: Response): Promise<Response> => {
    try {

        const request = new CreatePollRequest(req.body.question, req.body.answers);

        if (!request.question) {
            return res.status(400).json(new OperationResponse(false, "question Invalido"));
        }

        if (!request.answers || request.answers.length < 4) {
            return res.status(400).json(new OperationResponse(false, "answers Invalido"));
        }

        for (const answer of request.answers) {
            if (!answer) {
                return res.status(400).json(new OperationResponse(false, "answers Invalido"));
            }
        }

        const options: Option[] = []

        const poll = new Poll();
        poll.question = request.question;
        poll.pollId = uuidv4();

        for (const answer of request.answers) {
            const option = new Option()
            option.text = answer;
            option.optionId = uuidv4();
            option.pollId = poll.pollId;
            options.push(option);
        }

        await pollService.createPoll(poll);

        for (const option of options) {
            await optionService.createOption(option);
        }

        return res.status(200).json(new OperationResponseResult({ poll: poll, options: options }));

    } catch (error) {
        return res.status(500).json(new OperationResponse(false, error));
    }
}

export const vote = async (req: Request, res: Response): Promise<Response> => {
    try {

        const optionId = req.params.optionId;

        if (!optionId) {
            return res.status(400).json(new OperationResponse(false, 'optionId Invalido'));
        }

        await answerService.createAnswer(optionId);
        return res.status(200).json(new OperationResponse(true, ''));

    } catch (error) {
        return res.status(500).json(new OperationResponse(false, error));
    }

}

export const deletePoll = async (req: Request, res: Response): Promise<Response> => {
    try {

        const pollId = req.params.id;
        if (!pollId) {
            return res.status(400).json(new OperationResponse(false, 'id Invalido'));
        }

        const poll = await pollService.getById(pollId);

        if (!poll) {
            return res.status(400).json(new OperationResponse(false, "pollId Invalido"));
        }

        await optionService.deleteOptionByPoll(pollId);
        await pollService.deletePoll(pollId);

        return res.status(200).json(new OperationResponse(true, ''));

    } catch (error) {
        return res.status(500).json(new OperationResponse(false, error));
    }
}

export const deleteAllPolls = async (req: Request, res: Response): Promise<Response> => {

    try {

        await answerService.deleteAll();
        await optionService.deleteAll();
        await pollService.deleteAll();

        return res.status(200).json(new OperationResponse(true, ''));

    } catch (error) {
        return res.status(500).json(new OperationResponse(false, error));
    }
}