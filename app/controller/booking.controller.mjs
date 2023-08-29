import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
import bot from "../service/telegram.service.mjs";
import DB from "../../db/index.mjs";
import fileDirName from '../../file-dir-name.mjs';

const { __dirname } = fileDirName(import.meta);

const DBPATH = "/../../db/records.json";

dotenv.config();

const MASTERCHATID = process.env.TELEGRAM_MASTERCHATID;;

const MAILER_API = process.env.MAIL_SERVER_URL;

export class BookingController{
    constructor(){}
    
    async create(req, res) {
        if (req.method === 'POST') {
            let newContact = await this._create(req, res);
            return res.json(newContact);
        }else{
            return res.json({});
        }
    }
    _create(req, res){
        const now = new Date(Date.now());
        const dbJson = JSON.parse(DB);
        req.body.created_at = now;
        req.body.updated_at = now;
        let latestId = contacts.pop();
        let newContact = req.body;
        if(latestId){
            latestId = latestId.id + 1;
        }else{  
            latestId = 1;
        }
        newContact.id = latestId;
        dbJson.bookings.push(newContact);
        const DBJSON = {...dbJson};
        return fs.writeFileSync(path.join(
            path.normalize(__dirname + DBPATH)
        ), JSON.stringify(DBJSON, null, 2));
    }

}