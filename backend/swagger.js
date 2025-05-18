const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';
const productionHost = 'cse341-redo.onrender.com';

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API documentation for the Contacts routes',
  },
  host: isProduction ? productionHost : 'localhost:8080',
  schemes: isProduction ? ['https'] : ['http'],
  basePath: '/contacts'
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);