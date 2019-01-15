const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const dbPost = require('../database/postgresql');
const dbCass = require('../database/cassandra');
const { client, query, queryOptions } = dbCass;

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// server.use(express.static(path.join(__dirname, '/../client/dist')));
server.use('/', express.static('./client/dist/'));
server.use(/\/\d+\//, express.static('./client/dist/'));

//GET request to fetch a new song data from db
server.get('/api/jane/player/:id', (req, res) => {
  const { id } = req.params;
  // dbPost.query('SELECT * FROM songs WHERE id = $1', id)
  // db.songs.findByPk(id)
  client.execute(query, [ id ], queryOptions)
    .then((data) => { 
      console.log('I got data from Cassandra:', data)
      res.send(data).status(200); 
    })
    .catch((error) => { res.send(error).status(500); });
});

module.exports = server;
