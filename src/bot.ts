import { Bot } from 'grammy';

const botSetup = (options: { botToken: any; }) => {
  const { botToken } = options;
  const bot = new Bot(botToken);

  bot.command('start', (ctx) => ctx.reply('HELLO'));
  bot.on('message', (ctx) => ctx.reply('message received'));
  return bot;
};

export default botSetup;
