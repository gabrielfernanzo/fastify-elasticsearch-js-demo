require('dotenv').config();
const fastify = require('fastify')({ logger: true });

fastify.register(require('@fastify/elasticsearch'), {
  node: process.env.ELASTICSEARCH_URI,
  logLevel: 'debug',
});

const index = 'reminders';
const port = process.env.NODE_PORT;

fastify.get('/', (_request, reply) => {
  return {
    success: true,
    index,
  };
});

fastify.listen({ port, host: '0.0.0.0' }, (error) => {
  if (error) {
    console.error(error);
    throw error;
  }

  console.log(`🚀 listening on http://localhost:${port}`);
});
