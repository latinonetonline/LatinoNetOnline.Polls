import { pool } from '../database';
import { Poll } from "../models/Poll";

export class PollService {
    getAll = async () => {
        const result = await pool.query<Poll, Poll[]>("SELECT \"public\".\"Polls\".\"PollId\" AS \"pollId\", \"public\".\"Polls\".\"Question\" AS \"question\" FROM \"public\".\"Polls\"");
        return result.rows;
    }
    getById = async (pollId: string) => {
        const result = await pool.query<Poll, Poll[]>(`SELECT \"public\".\"Polls\".\"PollId\" AS \"pollId\", \"public\".\"Polls\".\"Question\" AS \"question\" FROM \"public\".\"Polls\" WHERE \"PollId\" = '${pollId}'`);
        return result.rowCount === 1 ? result.rows[0] : null;
    }

    createPoll = async (poll: Poll) => {
        await pool.query(`INSERT INTO \"public\".\"Polls\" ("PollId", "Question") VALUES ($1, $2);`, [poll.pollId, poll.question]);
    }
    deletePoll = async (pollId: string) => {
        await pool.query(`DELETE FROM \"public\".\"Polls\" WHERE \"PollId\" = '${pollId}'`);
    }
    deleteAll = async () => {
        await pool.query(`DELETE FROM \"public\".\"Polls\"`);
    }
}