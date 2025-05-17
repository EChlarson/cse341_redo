// Importing Required Modules
const express = require('express'); //A web framework for Node.js used to build APIs and handle routes.
const bodyParser = require('body-parser'); //Middleware to parse incoming JSON in request bodies.
const MongoClient = require('mongodb').MongoClient; //From the MongoDB package; used to connect to your database (though not used directly here).

const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

// Importing local modules
const mongodb = require('./db/connect'); //A custom module that handles the MongoDB connection logic.
const professionalRoutes = require('./routes/contacts.js'); //Handles the routes related to contacts (even though it isn't used directly—more on that below).

// Setting up the server
const port = process.env.PORT || 8080; //This defines the port your app will run on, using an environment variable if available (for deployment), or defaulting to 8080.
const app = express();

// Middleware - must come BEFORE your routes
app.use(cors());
app.use(express.json()); // <-- JSON parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // <-- this is redundant with express.json(), but still fine

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Allow CORS headers (optional here because `cors()` is already used)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// ROUTES - must come AFTER middleware that parses the body
app.use('/contacts', professionalRoutes);

// Connecting to MongoDB and starting the server
mongodb.initDb((err, mongodb) => { //Calls the initDb function from your custom db/connect.js file.
  if (err) { //If there's an error connecting to the database, it logs the error and does not start the server.
    console.log(err); 
  } else { //If the connection is successful, it starts the server and logs a success message.
    app.use('/', require('./routes'));
    app.listen(port, '0.0.0.0'); 
    console.log(`Connected to DB and listening on ${port}`);
  }
});
