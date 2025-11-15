import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

connectDB();

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
    res.send("API is running...");
})

import router from './routes/authRouter.js';
app.use('/api/auth', router);

import productRouter from './routes/productRouter.js';
app.use('/api/products', productRouter);

import cartRouter from './routes/cartRouter.js';
app.use('/api/cart', cartRouter);

import orderRouter from './routes/orderRouter.js';
app.use('/api/orders', orderRouter);

app.listen(8000);