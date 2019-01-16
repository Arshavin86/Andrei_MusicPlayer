const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const dbPost = require('../database/postgresql');
const dbCass = require('../database/cassandra');
const { client, selectQuery, insertQuery, queryOptions } = dbCass;

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// server.use(express.static(path.join(__dirname, '/../client/dist')));
server.use('/', express.static('./client/dist/'));
server.use(/\/\d+\//, express.static('./client/dist/'));

//GET request to fetch a new song data from db
server.get('/api/jane/player/:id', (req, res) => {
  const { id } = req.params;

  //make query in PostgreSQL:
  // dbPost.query('SELECT * FROM songs WHERE id = $1', id)

  //make query in Cassandra:
  client.execute(selectQuery, [ id ], queryOptions)

    .then((data) => { 
      console.log('I got data from Cassandra:', data)
      res.send(data).status(200); 
    })
    .catch((error) => { res.send(error).status(500); });
});

//POST request to insert a new song data into db
server.post('/api/jane/player/', (req, res) => {
  console.log(req.body);
  const { id, album, artist, duration, released, title, image, song_url} = req.body;

  //make query in Cassandra:
  client.execute(insertQuery, [ id, album, artist, duration, released, title, image, song_url ], queryOptions)

    .then((data) => { 
      console.log('I got response from Cassandra:', data)
      res.send(data).status(201); 
    })
    .catch((error) => { res.send(error).status(500) });
});

module.exports = server;
