import express = require ('express');
import mysql, {Connection} from 'mysql2'
import * as fs from 'fs'
import path from 'path'



const app = express();


const userPath = path.join(__dirname, "..", process.env.DB_USER_FILE);
const passPath = path.join(__dirname, "..", process.env.DB_PASSWORD_FILE);

const user = fs.readFileSync(userPath);
const pass = fs.readFileSync(passPath);


let db: Connection;

app.listen(8081, () => {
    setTimeout(()=> {
        db = mysql.createConnection({
            port: Number(process.env.DB_PORT),
            host: process.env.DB_HOST,
            user: user.toString(),
            password: pass.toString(),
            database: process.env.DB_DATABASE
        });
        db.connect((err) => {
            if (err) {
                console.log('Database connection failed: ', err);
            } else {
                console.log('Database is connected');
            }
        });
    },5000)
    console.info('[Server]', 'Server started');
});

app.use(express.json());


app.get("/api/test",(req,res)=> {

    res.status(200).send({
        message: 'test erfolgreich',
    });

})
