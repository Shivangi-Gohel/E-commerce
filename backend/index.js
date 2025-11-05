import express from "express";

const app = express();

app.use(express.json());

app.get('/', () => {
    console.log("hi");
})

app.listen(8000);