import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";

const app = express();

connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is running...");
})

import router from './routes/authRouter.js';
app.use('/api/auth', router);

import productRouter from './routes/productRouter.js';
app.use('/api/products', productRouter);

app.listen(8000);