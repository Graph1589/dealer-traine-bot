import { webhookCallback } from 'grammy';
import express from 'express';
import setupBot from './bot.js';

const app = express();
app.use(express.json());

const botToken = process.env.BOT_TOKEN;
const botOptions = {
  botToken,
};
const bot = setupBot(botOptions);

app.use(webhookCallback(bot, 'express'));
app.listen(Number(process.env.PORT));
