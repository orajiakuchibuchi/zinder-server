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

export class AuthService{
    DBPATH = "/../../db/records.json";
    userService = new UserService();
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
    updateAdmin(id, data){
        const dbJson = JSON.parse(DB);
        const index = [...dbJson.users].indexOf(u=>u.id == id);
        const user = this.userService.getByID(id);
        Object.keys(data).forEach((key)=> {
            // un-updatable fields
            if(key !== 'email' && key !== 'id' && key !== 'code' && data[key].length > 0){
                user[key] = data[key]
            }
        });
        const now = new Date(Date.now());
        user.created_at = now;
        user.updated_at = now;
        dbJson.users[index] = user;
        fs.writeFileSync(path.join(
            path.normalize(__dirname + this.DBPATH)
        ), JSON.stringify({...dbJson}, null, 2));
        return user;
    }
}