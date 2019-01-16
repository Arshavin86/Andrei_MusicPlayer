const cassandra = require('cassandra-driver');
// const async = require('async');

const clientOptions = {
    localDataCenter: 'datacenter1',
    contactPoints: ['127.0.0.1'], 
    keyspace: 'soundcloud'
}; 
//Connect to the cluster
const client = new cassandra.Client(clientOptions);
const selectQuery = 'SELECT * FROM songs WHERE id = ?';
const insertQuery = 'INSERT INTO songs (id, album, artist, duration, released, title, image, song_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?) IF NOT EXISTS';
const queryOptions = { prepare: true };

client.connect((err) => {
    if(err) {
       console.log('Error connecting cassandra is - ', err);
    } else {
       console.log('Successfully connected to cassandra.');
    }
}); 

module.exports = { 
    client,
    selectQuery,
    insertQuery,
    queryOptions,
}