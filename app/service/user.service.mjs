import dotenv from "dotenv";
import DB from "../../db/index.mjs";

dotenv.config();
// const request = require('request');

const MAILER_API = process.env.MAIL_SERVER_URL;

export class UserService{
    constructor(){}
    doesEmailExist(email){
        const dbJson = JSON.parse(DB);
        const users = dbJson.users;
        const found = users.find(u=>u.email.toLowerCase() == email.toLowerCase());
        return found ? true : false;
    }
    getByRole(role){
        const dbJson = JSON.parse(DB);
        const users = dbJson.users;
        const found = users.filter(u=>u.role.includes(role));
        return found
    }
    getByCode(code){
        const dbJson = JSON.parse(DB);
        const users = dbJson.users;
        const found = users.find(u=>u.code.toLowerCase() == code.toLowerCase());
        return found
    }
    getByEmail(email){
        const dbJson = JSON.parse(DB);
        const users = dbJson.users;
        const found = users.find(u=>u.email.toLowerCase() == email.toLowerCase());
        return found
    }
    getByPhone(phone){
        const dbJson = JSON.parse(DB);
        const users = dbJson.users;
        const found = users.find(u=>u.phone.toLowerCase() == phone.toLowerCase());
        return found
    }
    getByCountry(country){
        const dbJson = JSON.parse(DB);
        const users = dbJson.users;
        const found = users.filter(u=>u.country.toLowerCase() == country.toLowerCase());
        return found
    }
}