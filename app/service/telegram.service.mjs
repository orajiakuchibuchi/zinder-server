// const TelegramBot = require('node-telegram-bot-api');
import TelegramBot from "node-telegram-bot-api";
import path from "path";
import fs from "fs";
import fileDirName from "./../../file-dir-name.mjs";
import dotenv from "dotenv";
import DB from "../../db/index.mjs";
const { __dirname } = fileDirName(import.meta);
dotenv.config();
const dbdir = path.normalize(`${__dirname}/../../db`);
// Known master Chat ID
const MASTERCHATID = process.env.TELEGRAM_MASTERCHATID;
// replace the value below with the Telegram token you receive from @BotFather
const TOKEN = '';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/syncZinderTelegram (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  if (!resp || resp.length < 2) {
    bot.sendMessage(chatId, "Invailid Zinder User ID: " + resp);
  } else {
    const user = JSON.parse(DB).users.find(
      (u) => u.code.toLowerCase() == resp.toLowerCase()
    );
    if (!user.password || user.password.length < 4) {
      bot.sendMessage(
        chatId,
        `Set Zinder Account Secure Password: #${user.code}`
      );
    } else {
      bot.sendMessage(
        chatId,
        `Okay great, now enter the command followed by your zinder account password.\n /authZinderTelegram YOUR ZINER ACCOUNT PASSWORD`
      );
    }
  }
});
bot.onText(/\/authZinderTelegram (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  if (!resp || resp.length < 2) {
    bot.sendMessage(chatId, "Invailid Zinder User Password: " + resp);
  } else {
    bot.sendMessage(
      chatId,
      `Perfect, your chat ID is ${chatId}. i will always be here to give you the latest update across your zinder account.`
    );
  }

  // if(chatId == MASTERCHATID){
  //   // const file = await bot.getFile(path.normalize(dbdir + '/records.json'));

  //   // const file = await bot.downloadFile('records.json',dbdir);
  //   // console.log(file)
  //   bot.sendDocument(chatId, path.normalize(dbdir + '/records.json'));
  // }else{
  //   bot.sendMessage(chatId, 'Unautorized user, ' + chatId);
  // }
  // send back the matched "whatever" to the chat
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message");
});

export default bot;
