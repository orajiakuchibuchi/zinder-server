import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
import DB from "../../db/index.mjs";
import fileDirName from '../../file-dir-name.mjs';

const { __dirname } = fileDirName(import.meta);

dotenv.config();
// const request = require('request');

const MAILER_API = process.env.MAIL_SERVER_URL;

export class AuthService{
    DBPATH = "/../../db/records.json";
    constructor(){}
    saveAdmin(data){
        const dbJson = JSON.parse(DB);
        const users = [...dbJson.users];
        const now = new Date(Date.now());
        data.role = [data.role];
        data.id = users.length+1;
        data.created_at = now;
        data.updated_at = now;
        data.status = 'Active';
        dbJson.users.push(data);
        fs.writeFileSync(path.join(
            path.normalize(__dirname + this.DBPATH)
        ), JSON.stringify({...dbJson}, null, 2));
        return data;
    }
}