import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors(
//     {
//         origin: 'http://localhost: 3000',
//         methods: ['GET', 'PUT', 'POST', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     }
// ));

app.get('/', (request, response) => {
    return response.status(234).send("Welcome");
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App listening to the port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });