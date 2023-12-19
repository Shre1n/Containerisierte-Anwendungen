import express = require ('express');
import path from "path";
import mysql from 'mysql2'



const app = express();

const frontendHost: string = process.env.FRONTEND_HOST;
const frontendPort: string = process.env.FRONTEND_HOST;

const appUrl: string = `http://${frontendHost}:${frontendPort}/`;


const db = mysql.createConnection({
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    user: process.env.DB_USER_FILE,
    password: process.env.DB_PASSWORD_FILE,
    database: process.env.DB_DATABASE
});

app.listen(8000, () => {
    db.connect((err) => {
        if (err) {
            console.log('Database connection failed: ', err);
        } else {
            console.log('Database is connected');
        }
    });

    console.info('[Server]', 'Server started: http://localhost:8000');
});

app.use(express.json());


app.use("/", express.static(appUrl));
