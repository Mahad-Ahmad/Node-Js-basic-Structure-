import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Temple Day Spa Backend',
      version: '1.0.0',
      description: 'The Temple Day Spa API description'
    },
    servers: [
      {
        url: `${process.env.BACKEND_URL}:${process.env.PORT}`
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Path to your API routes
};

export const swagger = swaggerJsdoc(options);
