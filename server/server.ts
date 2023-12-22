import express = require ('express');
import mysql from 'mysql2'
import * as fs from 'fs'
import path from 'path'



const app = express();


const userPath = path.join(__dirname, "..", process.env.DB_USER_FILE);
const passPath = path.join(__dirname, "..", process.env.DB_PASSWORD_FILE);

const user = fs.readFileSync(userPath);
const pass = fs.readFileSync(passPath);
const db = mysql.createConnection({
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    user: user.toString(),
    password: pass.toString(),
    database: process.env.DB_DATABASE
});

app.listen(8000, () => {
    setTimeout(()=> {
        db.connect((err) => {
            if (err) {
                console.log('Database connection failed: ', err);
            } else {
                console.log('Database is connected');
            }
        });
    },3000)
    console.info('[Server]', 'Server started: http://localhost:8000');
});

app.use(express.json());
