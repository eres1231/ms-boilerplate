const logger = require('../lib/logger');

function filterBody(body) {
  const newBody = typeof body === 'string' ? JSON.parse(body) : body;
  const bodyToClean = { ...newBody };
  if (bodyToClean.password) bodyToClean.password = '<password>';
  if (bodyToClean.token) bodyToClean.token = '<token>';
  return bodyToClean;
}

module.exports = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  const filteredBody = filterBody(ctx.request.body);
  logger.info(`${ctx.method} ${ctx.url} -> ${ctx.status} - ${ms}ms, query: ${JSON.stringify(ctx.query)}, ${(ctx.method !== 'GET' || ctx.method !== 'DELETE') && `body: ${JSON.stringify(filteredBody)},`} at ${(new Date()).toISOString()}`);
};
