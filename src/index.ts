import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pollsRoutes from "./routes/polls.route";

const app = express();

// middlewares
app.use(helmet())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use(pollsRoutes);

app.listen(process.env.PORT || 3000);

console.log(`http://localhost:${process.env.PORT || 3000}`)