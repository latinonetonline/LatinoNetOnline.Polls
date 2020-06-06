import express from 'express';
import indexRoutes from "./routes/index";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use(indexRoutes);

app.listen(process.env.PORT || 3000);

console.log(`http://localhost:${process.env.PORT || 3000}`)