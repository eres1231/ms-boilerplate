const Router = require('koa-router');

const usecases = require('./usecases');

const router = new Router();

router.get('/', async (ctx, next) => {
  const payload = await usecases.helloWorld();

  ctx.resolve(200, { payload });

  return next();
});

module.exports = router;
