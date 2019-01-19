const cassandra = require('cassandra-driver')

const clientOptions = {
    localDataCenter: 'datacenter1',
    contactPoints: ['127.0.0.1'], 
    keyspace: 'soundcloud'
}; 
//Connect to the cluster
const client = new cassandra.Client(clientOptions);
const selectQuery = 'SELECT * FROM songs WHERE id = ?';
const insertQuery = 'INSERT INTO songs (id, album, artist, duration, title, image, song_url) VALUES (?, ?, ?, ?, ?, ?, ?) IF NOT EXISTS';
const updateQuery = 'UPDATE songs SET album=? title=? WHERE id=? IF EXISTS';
const queryOptions = { prepare: true, consistency: cassandra.types.consistencies.any }; //change to one

// const queryCreateKey = "CREATE KEYSPACE soundcloud WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };" 
// const queryUse = "use soundcloud;"
// const queryCreateTable =  "CREATE TABLE songs (id int PRIMARY KEY,album text, artist text, duration int, released date, title text, image text, song_url text);"

client.connect((err) => {
    if(err) {
       console.log('Error connecting cassandra is - ', err);
    } else {
       console.log('Successfully connected to cassandra.');
    }
}); 
  
// client
//     .connect()
//     .then(() => client.execute(clientOptions))
//     .then(() => client.execute(queryCreateKey))
//     .then(() => client.execute(queryUse))
//     .then(() => client.execute(queryCreateTable))
//     .catch((err) => {
//         console.log(err)
//     });

module.exports = { 
    client,
    selectQuery,
    insertQuery,
    queryOptions,
    updateQuery
}