const pgp = require('pg-promise')({});

const databaseConfig = {
  "host": "localhost",
  "port": 5432,
  "database": "soundcloud",
  "user": "andrei",
  "password": "privet",
};

// console.log(playlist);

const db = pgp(databaseConfig);

db.connect()
  .then(obj => {
    console.log('connected to database');
      obj.done(); // success, release the connection;
  })
  .catch(error => {
      console.log('ERROR:', error.message || error);
});

module.exports = db;
