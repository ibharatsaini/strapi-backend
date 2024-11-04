// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  // bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
  async bootstrap({ strapi }) {
    const io = require('socket.io')(strapi.server.httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Echo message back to the client with a "Server:" prefix
        const serverMessage = `Server: ${message}`;
        socket.emit('message', serverMessage);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  },
};
