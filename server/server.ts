import express = require ('express');
import mysql, {Connection} from 'mysql2'
import * as fs from 'fs'
import path from 'path'
import { Module } from "./Module";
import session from "express-session";
import {Request, Response, urlencoded} from 'express';

const app = express();

app.use(
  session({
      // Sitzung speichern, auch wenn sie nicht geändert wurde
      resave: true,
      // Sitzung speichern, auch wenn sie nicht verwendet wird
      saveUninitialized: true,
      // erzwingt das Setzen eines Cookies für jede Antwort, die zum Festlegen des Ablaufs erforderlich ist (maxAge)
      rolling: true,
      // Verschlüsselt die Sitzungs-ID im Cookie mit "secret" als Modifikator
      secret: "geheim",
      // Der Name des Cookie-Sets wird vom Server festgelegt
      name: "mySessionCookie",
      // setze einige Cookie-Attribute. Hier Ablaufdatum (Offset in ms)
      cookie: {maxAge: 6 * 60 * 1000 * 60} // 1h
  })
)
declare module 'express-session' {
    interface SessionData {
        accessId?: number
    }
}

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


app.get("/api/modules", checkAccessId, async (req,res)=> {

    const query: string= "SELECT * FROM `module`;";
    const data= [];

    try {
        const result = await runQuery(query, data);
        const returnData: Module[] = [];
        for (const row of result) {
            const module: Module = {
                id: Number(row.module_id),
                moduleCrp: Number(row.crp),
                moduleGrade: Number(row.grade),
                moduleName: String(row.module_name),
                moduleWeight: Number(row.weight)
            };
            returnData.push(module);
        }

        res.status(200).send({
            message: 'Data retrieved',
            moduleList: returnData
        });
    } catch (e) {
        res.status(500).send({
            message: 'Database Error'
        });
    }
});

app.get("/api/module/:id", checkAccessId, async (req,res)=> {
    const id = Number(req.params.id);

    const query: string= "SELECT * FROM module WHERE module_id = ?;";
    const data= [id];

    try {
        const result = await runQuery(query, data);
        const returnData: Module[] = [];
        for (const row of result) {
            const module: Module = {
                id: Number(row.module_id),
                moduleCrp: Number(row.crp),
                moduleGrade: Number(row.grade),
                moduleName: String(row.module_name),
                moduleWeight: Number(row.weight)
            };
            returnData.push(module);
        }

        res.status(200).send({
            message: 'Data retrieved',
            module: returnData[0]
        });
    } catch (e) {
        res.status(500).send({
            message: 'Database Error'
        });
    }
});

app.put("/api/module/:id", checkAccessId, async (req,res)=> {

    const id = Number(req.params.id);
    const moduleCrp = Number(req.body.moduleCrp);
    const moduleGrade = Number(req.body.moduleGrade);
    const moduleName = req.body.moduleName;
    const moduleWeight = Number(req.body.moduleWeight);

    const query: string= "UPDATE module SET grade = ?, weight = ?, crp = ?, module_name = ? WHERE module_id = ?;";
    const data= [moduleGrade, moduleWeight, moduleCrp, moduleName, id];

    try {
        const result = await runQuery(query, data);

        res.status(200).send({
            message: `Module with id ${id} updated`
        });
    } catch (e) {
        res.status(500).send({
            message: 'Database Error'
        });
    }
});

app.post("/api/module",  checkAccessId, async (req,res)=> {

    const moduleCrp = Number(req.body.moduleCrp);
    const moduleGrade = Number(req.body.moduleGrade);
    const moduleName = req.body.moduleName;
    const moduleWeight = Number(req.body.moduleWeight);

    const query: string= "INSERT INTO module (module_name, crp, weight, grade) VALUES (?, ?, ?, ?);";
    const data= [moduleName, moduleCrp, moduleWeight, moduleGrade];

    try {
        const result = await runQuery(query, data);

        res.status(201).send({
            message: `Module created`
        });
    } catch (e) {
        res.status(500).send({
            message: 'Database Error'
        });
    }
});


app.delete("/api/module/:id", checkAccessId, async (req,res)=> {

    const id = Number(req.params.id);

    const query: string= "DELETE FROM module WHERE module_id = ?";
    const data= [id];

    try {
        const result = await runQuery(query, data);

        res.status(201).send({
            message: `Module deleted`
        });
    } catch (e) {
        res.status(500).send({
            message: 'Database Error'
        });
    }
});

app.post("/api/setAccessId", async (req, res) => {

})


async function checkAccessId() {
    return (req: Request, res: Response, next) => {
        if (req.session.accessId !== 0) {
            next();
        } else {
            res.status(401).send({
                message: 'Do you have an acccessId, or do you want to start a new List?',
            });
        }
    };
}


async function runQuery(query: string, data: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
        db.query(query, data, (err: mysql.QueryError, result: any) => {
            if (err) {
                reject(result);
            } else {
                resolve(result);
            }
        });
    });
}