import needle from "needle";
import dotenv from "dotenv";
// import http from "http";
import request from "request";
import * as nodemailer from "nodemailer";
dotenv.config();
// const request = require('request');

const MAILER_API = process.env.MAIL_SERVER_URL;

export class MailService{
    transporter = nodemailer.createTransport({
        host: "notify@zinder.com.ng",
        port: 465,
        auth: {
          user: "subscribers@hireus.org.ng", //replace with your email
          pass: "Ea6qH9{+_E3S ", //replace with your password
        },
      });
    constructor(){}
    single(subject, from, to, html, cb, cc=[], bcc=[]){
        let data = {from,to,subject,cc,html,bcc};
        var clientServerOptions = {
            uri: MAILER_API,
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        request(clientServerOptions, function (error, response) {
            console.log("error,response.body");
            cb(error,response.body);
        });
        // return await needle.post(`${MAILER_API}/mail`, data)
        // .then(function(resp) { 
        //     console.log("resp");
        //     console.log(resp);
        //     console.log("resp");
        //  })
        // .catch(function(err) { 
        //     console.error("err") ;
        //     console.error(err) ;
        //     console.error("err") ;
        // })
    }
    send(mailOptions={
        from:  '', //replace with your email
        to: '',
        subject: '',
        bcc: '',
        html:''}){
            return new Promise((resolve, reject) => {
                return this.transporter.sendMail(mailOptions, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    console.log("Message sent: %s", result.messageId);
                    resolve(result);
               });
              });

    }

}