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

// --------------- tests the connection to the database ---------------
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

app.get('/inventory-test', async (req, res) => {
  try {
    const tabsQuery = pool.query('SELECT * FROM app_db.Inventory LIMIT 10;');
    console.log('Inside Inventory query');
    const x = await tabsQuery;
    console.log(tabsQuery);
    res.json(x);
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to load page. Please check the application logs for more details.').end();
  }
});

// --------------- user routes ---------------
app.get('/login-user/:username/:password', async(req, res) => {
  try {
    const tabsQuery = pool.query(`SELECT * FROM app_db.Users WHERE Username = '${req.params.username}' AND Password = '${req.params.password}';`);
    console.log('Inside Inventory query');
    const x = await tabsQuery;
    console.log(tabsQuery);
    res.json(x);
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to load page. Please check the application logs for more details.').end();
  }
})

app.get('/signup-user/:username/:password', async(req, res) => {
  try {
    const id = pool.query('SELECT MAX(UserId) AS Id FROM app_db.Users;');
    const u = await id;
    const tabsQuery = pool.query(`INSERT INTO app_db.Users(UserId, Username, Password) VALUES (${u[0].Id} + 1,'${req.params.username}', '${req.params.password}')`);
    console.log('Inside Inventory query');
    const x = await tabsQuery;
    console.log(tabsQuery);
    res.json(x);
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to load page. Please check the application logs for more details.').end();
  }
})

app.get('/login-user/change-password/:username/:newpassword', async(req, res) => {
  try {
    const tabsQuery = pool.query(`UPDATE app_db.Users SET Password = '${req.params.newpassword}' WHERE Username = '${req.params.username}';`);
    console.log('Inside Inventory query');
    const x = await tabsQuery;
    console.log(tabsQuery);
    res.json("good");
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to load page. Please check the application logs for more details.').end();
  }
})




// --------------- recommendations routes ---------------
// advanced query 1
app.get('/recommend', async(req, res) => {
  try {
    const tabsQuery = pool.query(`SELECT RecipeName, Time, NumberOfSteps, GROUP_CONCAT(Instruction 
                                  ORDER BY OrderNumber ASC 
                                  SEPARATOR '\n ' ) AS Instructions
                                  FROM Recipes r JOIN Steps s ON (r.RecipeId = s.Instruct)
                                  GROUP BY r.RecipeId
                                  ORDER BY RAND()
                                  LIMIT 15;`);
    console.log('Inside recommendation query');
    let x = await tabsQuery;
    console.log(tabsQuery);
    res.json(x);
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to load page. Please check the application logs for more details.').end();
  }
})

// --------------- recipes search page routes ---------------
app.get('/search/:query/:time/:steps', async (req, res) => {
  try {
    const tabsQuery = pool.query(`SELECT * FROM app_db.Recipes WHERE 
                                  RecipeName LIKE '%${req.params.query}%' 
                                  AND Time <= ${req.params.time} 
                                  AND NumberOfSteps <= ${req.params.steps}
                                  ORDER BY RAND() LIMIT 10;`);
    console.log('Inside search query');
    let x = await tabsQuery;
    console.log(tabsQuery);
    res.json(x);
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to load page. Please check the application logs for more details.').end();
  }
})

// advanced query 2
// app.get('/search/:query/:time/:steps', async (req, res) => {
//   try {
//     // add number of ingredients in the return!!!
//     const tabsQuery = pool.query(`SELECT RecipeName, Time, NumberOfSteps, COUNT(IngredientName) AS NumberOfIngredients FROM app_db.Recipes NATURAL JOIN app_db.Requires WHERE RecipeName LIKE '%${req.params.query}%' AND Time <= ${req.params.time} AND NumberOfSteps <= ${req.params.steps} GROUP BY RecipeId HAVING COUNT(IngredientName) < 10 ORDER BY RAND() LIMIT 10;`);
//     console.log('Inside search query');
//     let x = await tabsQuery;
//     console.log(tabsQuery);
//     res.json(x);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Unable to load page. Please check the application logs for more details.').end();
//   }
// })

// --------------- inventory page routes ---------------
app.get('/inventory-select/:userid', async (req, res) => {
  try {
    const tabsQuery = pool.query(`SELECT IngredientName FROM Inventory WHERE UserId = '${req.params.userid}'`);
    console.log('Inside inventory selection query');
    let x = await tabsQuery;
    console.log(tabsQuery);
    res.json(x);
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to load page. Please check the application logs for more details.').end();
  }
})

app.get('/inventory-insert/:userid/:ingredientname', async (req, res) => {
  try {
    const tabsQuery = pool.query(`INSERT INTO Inventory(UserId, IngredientName) VALUES ('${req.params.userid}', '${req.params.ingredientname}')`);
    console.log('Inside inventory insertion query');
    let x = await tabsQuery;
    console.log(tabsQuery);
    res.json(x);
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to load page. Please check the application logs for more details.').end();
  }
})

app.get('/inventory-delete/:userid/:ingredientname', async (req, res) => {
  try {
    const tabsQuery = pool.query(`DELETE FROM Inventory WHERE (UserId = '${req.params.userid}' AND IngredientName = '${req.params.ingredientname}')`);
    console.log('Inside inventory deletion query');
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


// --------------- favorites page routes ---------------
// app.get('/favorites', async (req, res) => {
//   const { userId, recipeId } = req.body;
//   try {
//     const query = `INSERT INTO Favorites (UserId, RecipeId) VALUES ('${userId}', '${recipeId}')`;
//     const tabsQuery = pool.query(query);
//     const x = await tabsQuery;
//     console.log(tabsQuery);
//     res.json(x);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Unable to add recipe to favorites. Please check the application logs for more details.').end();
//   }
//   console.log("added to favorites table!")
// });
