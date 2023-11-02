import * as UserRepo from '../../users/repository';
import type { FastifyPluginAsync } from 'fastify';

const get: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(import('../../plugins/auth'));

  fastify.get<{ Params: { id: number } }>('/', async function (request, reply) {
    try {
      return `Users`;
    } catch (err) {
      console.error(err);
      return 'error';
    }
  });

  fastify.get('/me', async function (request, reply) {
    try {
      return await UserRepo.getUserById(request.user.id);
    } catch (err) {
      console.error(err);
      return 'error';
    }
  });

  fastify.get<{ Params: { id: number } }>('/:id', async function (request, reply) {
    try {
      const { id } = request.params;
      const user = await UserRepo.getUserById(id);
      return `this is an getUserById: ${user?.name}`;
    } catch (err) {
      console.error(err);
      return 'error';
    }
  });
};

export default get;