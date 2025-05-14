const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Temple API',
    description: 'API documentation for the Temple routes',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/temple.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);