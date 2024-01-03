import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
import DB from "../../db/index.mjs";
import fileDirName from '../../file-dir-name.mjs';
import { UserService } from './user.service.mjs';

const { __dirname } = fileDirName(import.meta);

dotenv.config();
// const request = require('request');

const MAILER_API = process.env.MAIL_SERVER_URL;

export class DepartmentService{
    DBPATH = "/../../db/records.json";
    departments = ()=>{
        const dbJson = JSON.parse(DB);
        return [...dbJson.departments];
    }
    constructor(){}
    save(data){
        const dbJson = JSON.parse(DB);
        const now = new Date(Date.now());
        data.id = this.departments().length+1;
        data.created_at = now;
        data.updated_at = now;
        data.status = 'Active';
        dbJson.departments.push(data);
        fs.writeFileSync(path.join(
            path.normalize(__dirname + this.DBPATH)
        ), JSON.stringify({...dbJson}, null, 2));
        return data;
    }
    getBy(field, value){
        const found = this.departments().filter(u=>u[field] == value);
        return found
    }
    delete(code){
        const indexOf = this.departments().findIndex(d=>d.code ==code);
        const dbJson = JSON.parse(DB);
        const deleted =this.departments().splice(indexOf, 1);
        dbJson.departments.splice(indexOf, 1);
        fs.writeFileSync(path.join(
            path.normalize(__dirname + this.DBPATH)
        ), JSON.stringify({...dbJson}, null, 2));
        return deleted;
    }
    update(code,data){
        const dbJson = JSON.parse(DB);
        const indexOf = [...dbJson.departments].findIndex(d=>d.code ==code);
        const now = new Date(Date.now());
        dbJson.departments[indexOf].updated_at = now;
        dbJson.departments[indexOf] = {...dbJson.departments[indexOf],...data, who: dbJson.departments[indexOf].who};
        fs.writeFileSync(path.join(
            path.normalize(__dirname + this.DBPATH)
        ), JSON.stringify({...dbJson}, null, 2));
        return dbJson.departments[indexOf];

    }

}