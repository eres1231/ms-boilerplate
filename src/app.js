const Koa = require('koa');
const cors = require('kcors');
const koaBody = require('koa-body');
const helmet = require('koa-helmet');
const koaActuator = require('koa-actuator');
const { resolver, errorHandler } = require('smrtx-middlewares');
const logger = require('./lib/logger');
const loggerMiddleware = require('./utils/logger');

const router = require('./router');

const app = new Koa();

app.context.logger = logger;

if (process.env.NODE_ENV === 'production') {
  logger.info('Initializing helmet...');
  app.use(helmet());
}

app.use(loggerMiddleware);
app.use(errorHandler);
app.use(cors());
app.use(koaBody({ multipart: true, formidable: { maxFileSize: 10000000 } }));
app.use(koaActuator());
app.use(resolver);
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
