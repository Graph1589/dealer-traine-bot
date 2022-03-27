import { Bot, Composer, session } from 'grammy';
import { Router } from '@grammyjs/router';

const botSetup = (options) => {
  const { botToken } = options;
  const bot = new Bot(botToken);

  const router = new Router((ctx) => ctx.session.step);

  bot.use(session({ initial: () => ({ x: 1 }) }));

  const testComposer = new Composer();

  testComposer.command('1', (ctx) => ctx.reply('first'));

  testComposer.command('2', (ctx) => ctx.reply('second'));

  testComposer.command('exit', (ctx) => {
    ctx.session.step = null;
    ctx.reply('exit');
  });

  router.route('x', testComposer);

  bot.use(router);

  bot.catch((err) => console.log(err));

  bot.command('start', (ctx) => {
    console.error({ ctx });
    return ctx.reply('HELLO');
  });

  bot.command('help', (ctx) => ctx.reply('HELP MSG'));

  bot.on('message', (ctx) => {
    ctx.reply('message received');
    ctx.session.step = 'x';
  });

  return bot;
};

export default botSetup;
