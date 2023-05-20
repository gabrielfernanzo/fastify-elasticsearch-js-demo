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

fastify.post(`/reminders`, async (request, reply) => {
  try {
    const { result } = await fastify.elastic.index({
      index,
      op_type: 'create',
      document: { ...request.body, created_at: new Date() },
    });

    reply.statusCode = 201;
    return { success: true, result };
  } catch (excepiton) {
    reply.statusCode = 500;

    return { success: false, excepiton };
  }
});

fastify.get(`/reminders/_search`, async (request, reply) => {
  try {
    const { page, size, ...query } = request.query;

    const q = Object.entries(query)
      .map((search) => {
        return search.join(':');
      })
      .join(' and ');

    console.log({ q });

    const {
      hits: { hits: result },
    } = await fastify.elastic.search({
      index,
      search_after: page,
      size,
      q,
    });

    reply.statusCode = 200;

    return { success: true, result };
  } catch (excepiton) {
    reply.statusCode = 500;

    return { success: false, excepiton };
  }
});

fastify.listen({ port, host: '0.0.0.0' }, (error) => {
  if (error) {
    console.error(error);
    throw error;
  }

  console.log(`🚀 listening on http://localhost:${port}`);
});
