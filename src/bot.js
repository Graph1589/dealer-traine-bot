import { Bot, session } from 'grammy';
import { Router } from '@grammyjs/router';

const botSetup = (options) => {
  const { botToken } = options;
  const bot = new Bot(botToken);

  const router = new Router((ctx) => ctx.session.step);
  router.route('route', () => {});

  bot.use(session({ initial: () => ({ x: 1 }) }));

  bot.catch((err) => console.log(err));

  bot.command('start', (ctx) => {
    console.error({ ctx });
    return ctx.reply('HELLO');
  });

  bot.command('help', (ctx) => ctx.reply('HELP MSG'));

  bot.on('message', (ctx) => ctx.reply('message received'));

  return bot;
};

export default botSetup;
