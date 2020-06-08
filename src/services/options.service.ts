import { pool } from '../database';
import { Poll } from "../models/Poll";
import { OptionVotes } from "../models/OptionVotes";
import { Option } from "../models/Option";


export class OptionService {
    getOptionsWithVotes = async (pollId: string) => {
        const result = await pool.query<OptionVotes, OptionVotes[]>(`SELECT \"public\".\"Options\".*, (select  Count(*) from \"public\".\"Answers\" WHERE \"public\".\"Options\".\"OptionId\" = \"public\".\"Answers\".\"OptionId\") AS Votes
            FROM \"public\".\"Options\" 
            WHERE \"public\".\"Options\".\"PollId\" = '${pollId}';`);

        return result.rows;
    }
    getById = async (optionId: string) => {
        const result = await pool.query<Poll, Poll[]>(`SELECT * FROM \"public\".\"Options\" WHERE \"PollId\" = '${optionId}'`);
        return result.rowCount === 1 ? result.rows[0] : null;
    }
    createOption = async (option: Option) => {
        await pool.query(`INSERT INTO \"public\".\"Options\" ("OptionId", "Text", "PollId") VALUES ($1,$2,$3);`, [option.optionId, option.text, option.pollId]);
    }
    deleteOption = async (optionId: string) => {
        await pool.query(`DELETE FROM \"public\".\"Options\" WHERE \"OptionId\" = '${optionId}'`);
    }
    deleteOptionByPoll = async (optionId: string) => {
        await pool.query(`DELETE FROM \"public\".\"Options\" WHERE \"PollId\" = '${optionId}'`);
    }
    deleteAll = async () => {
        await pool.query(`DELETE FROM \"public\".\"Options\"`);
    }
}