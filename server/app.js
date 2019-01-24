// const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const postgres = require('./controllers');
// const dbCass = require('../database/cassandra');
// const { client, selectQuery, insertQuery, queryOptions, updateQuery } = dbCass;

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// server.use(express.static(path.join(__dirname, '/../client/dist')));
server.use('/', express.static('./client/dist/'));
server.use(/\/\d+\//, express.static('./client/dist/'));

//GET request to fetch a new song data from db
server.get('/api/jane/player/:id', (req, res) => {
  // const { id } = req.params;
  //make query in PostgreSQL:
  postgres.get(req, res);

  //make query in Cassandra:
  // client.execute(selectQuery, [ id ], queryOptions)
    // .then((data) => { 
    //   console.log('I got data from database: ', data.rows)
    //   res.send(data).status(200); 
    // })
    // .catch((error) => { 
    //   console.log('Selecting from db is failed: ',err);
    //   res.send(error).status(500); 
    // });
});

//POST request to insert a new song data into db
server.post('/api/jane/player/', (req, res) => {

  postgres.add(req, res)

});

//PUT request to update a song on the db
server.put('/api/jane/player/:id', (req, res) => {
  // const { id } = req.params;
  // console.log(typeof Number(id));

  postgres.update(req, res);

});

//DELETE request to delete a song from the db
server.delete('/api/jane/player/:id',  (req, res) => {
  
  postgres.delete(req, res);

});

module.exports = server;
