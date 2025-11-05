import express from "express";
import { connectDB } from "./config/db.js";

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is running...");
})

import router from './routes/authRouter.js';
app.use('/api/auth', router);

app.listen(8000);