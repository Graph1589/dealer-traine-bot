import { Bot, session } from 'grammy';
import { Router } from '@grammyjs/router';

import getRouletteBracketsComposer from './getRouletteAdditionComposer.js';

const botSetup = (options) => {
  const { botToken } = options;
  const bot = new Bot(botToken);

  bot.catch((err) => console.log(err));

  bot.api.setMyCommands([
    { command: 'roulette_5_scope', description: '1 scope roulette addition' },
    { command: 'roulette_1_scope', description: '5 scope roulette addition' },
  ]);

  const rouletteFiveScope = getRouletteBracketsComposer(5);
  const rouletteOneScope = getRouletteBracketsComposer(1);

  const router = new Router((ctx) => ctx.session.step);

  bot.use(session({ initial: () => ({ step: null }) }));

  router.route('roulette_1_scope', rouletteOneScope);
  router.route('roulette_5_scope', rouletteFiveScope);
  router.otherwise((ctx, next) => next());

  bot.use(router);

  bot.start((ctx) => {
    console.error({ ctx });
    return ctx.reply('START MSG');
  });

  bot.command(['roulette_5_scope', 'roulette_1_scope'], (ctx) => {
    ctx.session.step = 'roulette_5_scope';
    ctx.reply('set step');
    return ctx.reply('some rules, /exit for stop, send message when ready');
  });

  bot.command('help', (ctx) => ctx.reply('HELP MSG'));

  bot.command('exit', (ctx) => {
    ctx.session.step = null;
    return ctx.reply('GAME OVER MSG');
  });

  bot.on('message', (ctx) => ctx.reply('SHORT HELP MSG'));

  return bot;
};

export default botSetup;
