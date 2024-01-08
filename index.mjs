// Doc : https://www.npmjs.com/package/json-server
// Doc 2: https://github.com/passageidentity/example-node/blob/main/02-Login-With-Profile/index.js

import Passage from "@passageidentity/passage-node";
import hbs from "hbs";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import JsonServer from 'json-server';
import authMiddleware from './middleware/auth.mjs';
import fileDirName from './file-dir-name.mjs';
import crons from "./app/cron/index.mjs";
import bot from "./app/service/telegram.service.mjs";
import { ContactController } from "./app/controller/contact.controller.mjs";
import { TelegramController } from "./app/controller/telegram.controller.mjs";
import { BookingController } from "./app/controller/booking.controller.mjs";
import { UserController } from "./app/controller/user.controller.mjs";
import { AttendanceController } from "./app/controller/attendance.controller.mjs";
import { MailController } from "./app/controller/mail.controller.mjs";
import { AuthController } from "./app/controller/auth.controller.mjs";
import { DepartmentController } from "./app/controller/department.controller.mjs";
import { RecruitmentController } from "./app/controller/recruitment.controller.mjs";
import { InvoiceController } from "./app/controller/invoice.controller.mjs";

dotenv.config();

const DBPATH= '/db/records.json';
const { __dirname } = fileDirName(import.meta);
const DB = __dirname + DBPATH;
const public_dir = `${__dirname}/public`;
const PORT = process.env.PORT;
const SERVER_NAME = process.env.SERVER_NAME;
const SERVER_URL = process.env.SERVER_URL; 
const passageConfig = { appID: process.env.PASSAGE_APP_ID, apiKey: process.env.PASSAGE_API_KEY};
const contact = new ContactController();
const telegram = new TelegramController();
const bookings = new BookingController();
const userController = new UserController();
const attendanceController = new AttendanceController();
const authController = new AuthController();
const departmentController = new DepartmentController();
const recruitmentController = new RecruitmentController();
const invoiceController = new InvoiceController()
const mailController = new MailController(express);
const TELEGRAM_MASTERGROUPCHATID = process.env.TELEGRAM_MASTERGROUPCHATID;

// JSON Server Router
const router = JsonServer.router(DB);
const app = JsonServer.create();
// JSON Server Default middleware
const middlewares = JsonServer.bodyParser;
// Push any custom middleware
middlewares.push(authMiddleware);
// 
app.set('port', PORT);

// app.use('/public', express.static('public'));

app.use('views', express.static('public'));

app.get("/", (req, res) => {
  res.render(`${public_dir}/index.hbs`, { appID: process.env.PASSAGE_APP_ID });
});


// example of custom middleware
let passage = new Passage(passageConfig);
let passageAuthMiddleware = (() => {
  return async (req, res, next) => {
    try {
      let userID = await passage.authenticateRequest(req);
      if (userID) {
        // user is authenticated
        res.userID = userID;
        next();
      }
    } catch (e) {
      console.log(e);
      res.render("unauthorized.hbs");
    }
  };
})();


// authenticated route that uses middleware
app.get("/dashboard", passageAuthMiddleware, async (req, res) => {
  let userID = res.userID;
  let user = await passage.user.get(userID);

  let userIdentifier;
  if (user.email) {
    userIdentifier = user.email;
  } else if (user.phone) {
    userIdentifier = user.phone;
  }
  res.render(`${public_dir}\\dashboard.hbs`, { appID: process.env.PASSAGE_APP_ID });
});



app.use(middlewares);



// Add custom routes before JSON Server router

// ====== CUSTOM API STARTS ====== (POST, GET, PATCH/UPDATE, DELETE)


app.post('/accounting/invoice/create', (req, res)=>invoiceController.create(req, res));
app.get('/accounting/invoice/read', (req, res)=>invoiceController.read(req, res));
app.patch('/accounting/invoice/update', (req, res)=>invoiceController.update(req, res));
app.delete('/accounting/invoice/delete', (req, res)=>invoiceController.delete(req, res));
app.get('/accounting/invoice/all', (req, res)=>invoiceController.all(req, res));


app.post('/hr/department/create', (req, res)=>departmentController.create(req, res));
app.get('/hr/department/read', (req, res)=>departmentController.read(req, res));
app.patch('/hr/department/update', (req, res)=>departmentController.update(req, res));
app.delete('/hr/department/delete', (req, res)=>departmentController.delete(req, res));
app.get('/hr/department/all', (req, res)=>departmentController.all(req, res));



app.post('/hr/recruitment/job-position/create', (req, res)=>recruitmentController.position.create(req, res));
app.get('/hr/recruitment/job-position/read', (req, res)=>recruitmentController.position.read(req, res));
app.patch('/hr/recruitment/job-position/update', (req, res)=>recruitmentController.position.update(req, res));
app.delete('/hr/recruitment/job-position/delete', (req, res)=>recruitmentController.position.delete(req, res));
app.get('/hr/recruitment/job-position/all', (req, res)=>recruitmentController.position.all(req, res));

app.post('/hr/recruitment/job-opening/create', (req, res)=>recruitmentController.opening.create(req, res));
app.get('/hr/recruitment/job-opening/read', (req, res)=>recruitmentController.opening.read(req, res));
app.patch('/hr/recruitment/job-opening/update', (req, res)=>recruitmentController.opening.update(req, res));
app.delete('/hr/recruitment/job-opening/delete', (req, res)=>recruitmentController.opening.delete(req, res));
app.get('/hr/recruitment/job-opening/all', (req, res)=>recruitmentController.opening.all(req, res));



app.post('/register-admin', (req, res)=>authController.register(req, res))
app.get('/get-admins', (req, res)=>authController.getAdmins(req, res))
app.patch('/update-admin', (req, res)=>authController.updateAdmin(req, res))
app.delete('/delete-admin', (req, res)=>authController.deleteAdmin(req, res))

app.get('/my-events/who_like=:who_like', (req, res) => {
  const dbJson = fs.readFileSync(path.join(DB));
	const events = JSON.parse(dbJson).events;
  const now = new Date(Date.now());
  const ongoing = [];
  const myrelated = events.filter(e=>{
    console.log(e)
    if(e.status == 'upcoming'){
      const shouldstart = new Date(e.start);
      const shouldend = new Date(e.end);
      if(now.getTime() >= shouldstart.getTime()
       && now.getTime() <= shouldend.getTime()){
        ongoing.push(e)
      }
    }
    return e.users.findIndex(i=>i.code == req.params.who_like) > -1;
  });
  ongoing.forEach(e => {
    console.log(e)
  });

  
  res.jsonp(myrelated);
})

app.post('/employees', (req, res) => userController.getEmployees(req, res))
app.get('/contacts/who_like=:who_like', (req, res) => contact.myContacts(req, res))
app.post('/contacts', (req, res) => contact.myContacts(req, res))
app.post('/telegram-message-admin', async (req, res) => await telegram.messageAdmin(req, res))
app.post('/appointment-schedule', async (req, res) => attendanceController.create(req, res))
app.post('/mail-notify', async (req, res) => mailController.dispatch(req, res))
app.post('/bookings', (req, res) => bookings.create(req, res))


app.get('/my-conversations/who_like=:who_like', (req, res) => {
  const dbJson = fs.readFileSync(path.join(DB));
	const conversations = JSON.parse(dbJson).conversation;
  const myrelated = conversations.filter(e=>e.sender == req.params.who_like || e.recipient == req.params.who_like);
  res.jsonp(myrelated);
})

// ====== CUSTOM API ENDS ======


app.get('/myip', (req, res) => {
  const ipAddress =  req.header('x-forwarded-for') ||
  req.socket.remoteAddress;
  
  console.log(ipAddress)
  res.jsonp(ipAddress);
})
app.use(JsonServer.defaults());
app.use(router);
app.set("view engine", "hbs");
app.set("view engine", "html");
app.engine("html", hbs.__express);

app.listen(PORT, () => {
  let mes = `Main Server Deployed Successfully \n[Port: ${app.get("port")}]
  \n[URL => localhost:${app.get("port")}]`;
  let now = new Date(Date.now())
  mes+=`\n\n\nSent At: ${now.toLocaleTimeString()}, ${now.toLocaleDateString()}`;

  bot.sendMessage(TELEGRAM_MASTERGROUPCHATID, mes);
    console.log(mes);
});


