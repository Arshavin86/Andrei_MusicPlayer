const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const db = require('../database/postgresql');

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// server.use(express.static(path.join(__dirname, '/../client/dist')));
server.use('/', express.static('./client/dist/'));
server.use(/\/\d+\//, express.static('./client/dist/'));

server.listen(8000, () => { console.log('listening to port 8000'); });

//GET request to fetch a new song data from db
server.get('/api/jane/player/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM songs WHERE id = $1', id)
  // db.songs.findByPk(id)
    .then((data) => { res.send(data).status(200); })
    .catch((error) => { res.send(error).status(500); });
});

module.exports = server;


