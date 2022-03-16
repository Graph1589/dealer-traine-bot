import { Bot } from 'grammy';

const botSetup = (options) => {
  const { botToken } = options;
  const bot = new Bot(botToken);

  bot.command('start', (ctx) => ctx.reply('HELLO'));
  bot.on('message', (ctx) => ctx.reply('message received'));
  return bot;
};

module.exports = botSetup;
