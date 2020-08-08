const server = require('./app');
const logger = require('./lib/logger');

const PORT = process.env.TEST_PORT
  || process.env.PORT
  || process.env.NOMAD_PORT_http
  || 4000;

server.listen(PORT, () => {
  logger.info(`server up & running... listening on ${PORT}`);
});

server.on('error', ({ message }) => {
  logger.error(`server error: ${message}`);
});
