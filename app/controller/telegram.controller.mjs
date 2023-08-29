import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
import bot from "../service/telegram.service.mjs";
import {TELEGRAMDB} from "../../db/index.mjs";
import fileDirName from '../../file-dir-name.mjs';

const { __dirname } = fileDirName(import.meta);

const DBPATH = "/../../db/data/telegram.json";

dotenv.config();

const MASTERCHATID = process.env.TELEGRAM_MASTERCHATID;;

const MAILER_API = process.env.MAIL_SERVER_URL;

export class TelegramController{
    constructor(){}
    
    async messageAdmin(req, res) {
        let message = ``;
        if (req.method === 'POST') {
            message =  await bot.sendMessage(MASTERCHATID, req.body.message);
        }else{
            message =  await bot.sendMessage(MASTERCHATID,req.params.message);
        }
       const updated =  await this._updateDb(message);
       return res.json(message);
    }
    _updateDb(message){
        const dbJson = JSON.parse(TELEGRAMDB);
        dbJson.messages.unshift(message);
        return fs.writeFileSync(path.join(
            path.normalize(__dirname + DBPATH)
        ), JSON.stringify(dbJson, null, 2));
    }
    

}