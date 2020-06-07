import { Router } from "express";
import { getPolls, getPollById, getByEvent, getResult, createPoll, vote, deletePoll} from "../controllers/polls.controller"
import { checkJwt } from "../middlewares/authz.middleware.ts";

const router = Router();

router.get('/api/polls', getPolls)
router.get('/api/polls/:id', getPollById)
router.get('/api/polls/getByEvent/:eventId', getByEvent)
router.get('/api/polls/GetResult/:id', getResult)
router.post('/api/polls',[checkJwt], createPoll)
router.delete('/api/polls/:id',[checkJwt], deletePoll)
router.patch('/api/polls/vote/:optionId', vote)

export default router;