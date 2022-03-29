import { Composer } from 'grammy';

export default (bracketsNum) => {
  const composer = new Composer(async (ctx, next) => {
    await ctx.reply('QUESTION');
    return next();
  });

  composer.command('exit', (ctx) => {
    ctx.session.step = null;
    return ctx.reply('bb');
  });

  composer.on('message', (ctx) => ctx.reply({ bracketsNum }));

  return composer;
};
