import { pool } from '../database';


export class AnswerService {
    createAnswer = async (optionId: string) => {
        await pool.query(`INSERT INTO \"public\".\"Answers\" (\"OptionId\") VALUES ('${optionId}')`);
    }
    deleteAll = async () => {
        await pool.query(`DELETE FROM \"public\".\"Answers\"`);
    }
}