const db = require('./postgresql');
const playlist = require('./faker');
const pgp = require('pg-promise')({});

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  
  function getNextData(t, pageIndex) {
    let data = null;
    if (pageIndex < 1000) {
      data = [];
      for (let i = 1; i < 10001; i++) {//5:21 with 1000 chunks, 5:25 with 100 chunks, 5:30 with 10 chunks
        const idx = pageIndex * 10000 + i;
        console.log(idx);
        data.push({
          id: idx,
          album: playlist.songArray[idx-1].album,
          artist: playlist.songArray[idx-1].artist,
          duration: playlist.songArray[idx-1].duration,
          released: playlist.songArray[idx-1].released,
          title: playlist.songArray[idx-1].title,
          image: playlist.songArray[idx-1].image,
          song_url: playlist.songArray[idx-1].song_url,
        });
      }
    }
    return Promise.resolve(data);
  }
  
  const cs = new pgp.helpers.ColumnSet([
    'id',
    'album',
    'artist', 
    'duration',
    'released',
    'title',
    'image',
    'song_url',
  ], {table: 'songs'});

  db.tx('massive-insert', t => {
    return t.sequence(index => { 
      return getNextData(t, index)
      .then(data => {
        if (data) {
            const insert = pgp.helpers.insert(data, cs);
            return t.none(insert);
        }
      });
    });
  })
  .then(data => {
    // COMMIT has been executed
    console.log('Total batches:', data.total, ', Duration:', millisToMinutesAndSeconds(data.duration));
  })
  .catch(error => {
    // ROLLBACK has been executed
    console.log(error);
  });