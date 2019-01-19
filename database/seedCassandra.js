const playlist = require('./faker');
const cassandra = require('./cassandra');
const { client } = cassandra;
const queryTemp = 'INSERT INTO songs (id, album, artist, duration, released, title, image, song_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
const song = playlist.songArray;
console.log(song.length)
 

function getNextData(queries, chunk) {
  console.log(chunk);
  for (let i = 0; i < 100; i++) {
      const idx = chunk * 100 + i;
      let query = {};
      let params = [
          song[idx].id,
          song[idx].album,
          song[idx].artist,
          song[idx].duration,
          song[idx].released,
          song[idx].title,
          song[idx].image,
          song[idx].song_url,
      ];
      query.query = queryTemp;
      query.params = params;
      queries.push(query);
  }
  return queries;
}
const queryOptions = { prepare: true };

async function insertBatch() {
  let chunk = 0;
  let queries = [];
  try { 
    while (chunk < 100000) {
      let data = await getNextData(queries, chunk);
      let response = await client.batch(data, queryOptions);
      // console.log(response);
      queries = [];
      chunk ++;
    }
  }
  catch(err) {
    console.log(err)
  }
}

insertBatch();

