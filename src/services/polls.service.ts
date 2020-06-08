import { pool } from '../database';
import { Poll } from "../models/Poll";

export class PollService {
    getAll = async () => {
        const result = await pool.query<Poll, Poll[]>("SELECT * FROM \"public\".\"Polls\"");
        return result.rows;
    }
    getById = async (pollId: string) => {
        const result = await pool.query<Poll, Poll[]>(`SELECT * FROM \"public\".\"Polls\" WHERE \"PollId\" = '${pollId}'`);
        return result.rowCount === 1 ? result.rows[0] : null;
    }
    getByEventId = async (eventId: string) => {
        const result = await pool.query<Poll, Poll[]>(`SELECT * FROM \"public\".\"Polls\" WHERE \"EventId\" = '${eventId}'`);
        return result.rows;
    }
    createPoll = async (poll: Poll) => {
        await pool.query(`INSERT INTO \"public\".\"Polls\" ("PollId", "Question", "EventId") VALUES ($1, $2, $3);`, [poll.pollId, poll.question, poll.eventId]);
    }
    deletePoll = async (pollId: string) => {
        await pool.query(`DELETE FROM \"public\".\"Polls\" WHERE \"PollId\" = '${pollId}'`);
    }
    deleteAll = async () => {
        await pool.query(`DELETE FROM \"public\".\"Polls\"`);
    }
}