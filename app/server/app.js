const express = require('express');
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');
var cors = require('cors');


const app = express();

app.use(cors());

// app.set('view engine', 'pug');
app.enable('trust proxy');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use((req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});

// Create a Winston logger that streams to Stackdriver Logging.
const winston = require('winston');
const {LoggingWinston} = require('@google-cloud/logging-winston');
const loggingWinston = new LoggingWinston();
const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console(), loggingWinston],
});
const createTcpPool = async config => {
  // Extract host and port from socket address
  console.log('Inside TCP');
  // Establish a connection to the database
  return await mysql.createPool({
    user: 'root', 
    password: 'TheMiniLegends', 
    database: 'app_db',
    host: '127.0.0.1',
    port: '3301', 
    ...config,
  });
  console.log('End of TCP');
};


const createPool = async () => {
  const config = {
    connectionLimit: 5,
    connectTimeout: 10000, // 10 seconds
    acquireTimeout: 10000, // 10 seconds
    waitForConnections: true, // Default: true
    queueLimit: 0, // Default: 0
  };
  return await createTcpPool(config);
};

const ensureSchema = async pool => {
  // Wait for tables to be created (if they don’t already exist).
  console.log('Ensured that table exists');
};
const createPoolAndEnsureSchema = async () =>
await createPool().then(async pool => {
  await ensureSchema(pool);
  return pool;
}).catch(err => {
  throw err;
});

let pool;

app.use(async (req, res, next) => {

  if (pool) {
    return next();
  }
  try {
    pool = await createPoolAndEnsureSchema();
    console.log('Inside createPoolAndEnsureSchema');
    next();
  } catch (err) {
    logger.error(err);
    return next(err);
  }
});

app.get('/', async(req, res) => {
  res.send('Mealme');
})

// tests the connection to the database
app.get('/recipe-test', async (req, res) => {
  try {
    const tabsQuery = pool.query('SELECT RecipeName FROM app_db.Recipes LIMIT 10;');
    console.log('Inside query');
    const x = await tabsQuery;
    console.log(tabsQuery);
    res.json(x);
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to load page. Please check the application logs for more details.').end();
  }
});

// simple search route given a keyword
app.get('/search/:query', async (req, res) => {
  try {
    const tabsQuery = pool.query(`SELECT * FROM app_db.Recipes WHERE RecipeName LIKE '%${req.params.query}%' LIMIT 10;`);
    console.log('Inside search query');
    let x = await tabsQuery;
    console.log(tabsQuery);
    res.json(x);
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to load page. Please check the application logs for more details.').end();
  }
})



const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

process.on('uncaughtException', function (err) {
  console.log(err);
  throw err;
});

module.exports = server;