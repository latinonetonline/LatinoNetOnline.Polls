import express from 'express';
import indexRoutes from "./routes/index";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use(indexRoutes);

app.listen(4000);

console.log(`http://localhost:4000`)