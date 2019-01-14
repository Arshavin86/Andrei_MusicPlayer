const playlist = require('./faker');
const client = require('./cassandra');

const queryTemp = 'INSERT INTO songs (id, album, artist, duration, released, title, image, song_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
const song = playlist.songArray;
console.log(song.length)

const queries = [
 ]; 

for (var i = 0; i < song.length; i++) {
    let query = {};
    let params = [
        i + 1,
        song[i].album,
        song[i].artist,
        song[i].duration,
        song[i].released,
        song[i].title,
        song[i].image,
        song[i].song_url,
    ];
    query.query = queryTemp;
    query.params = params;
    queries.push(query);
    console.log(i);
}

// Promise-based call
const queryOptions = { prepare: true, consistency: cassandra.types.consistencies.quorum };

client.batch(queries, queryOptions)
.then((result) => {
    console.log(result)
})
.catch((err) => {
    console.log(err)
});


      //use prepared statements or hints for the driver to encode the data accordingly:
//     client.execute(query, params, {prepare: true})
//   .then(result => console.log(i))
//   .catch(err => console.log(err));
