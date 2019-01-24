const postgres = require('../database/postgresql');
const { db } = postgres;

exports.get = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM songs WHERE id = $1', id)
    .then((data) => { 
        console.log('I got data from database: ', data)
        res.send(data).status(200); 
      })
      .catch((error) => { 
        console.log('Selecting from db is failed: ', error);
        res.send(error).status(500); 
      });
}

exports.add = (req, res) => {
    // console.log('req in controller: ', typeof req.body.duration);
    const { album, artist, duration, released, title, image, song_url } = req.body;
    db.query('SELECT count(*) AS exact_count FROM songs')
  .then(data => data[0].exact_count)
  .then(id => {
    //   console.log('id: ', typeof id);

      let rel = released.slice(0,10);
    //   console.log('rel: ',rel)

    //use prepared statement:
    let qur = 'INSERT INTO songs (id, album, artist, duration, released, title, image, song_url ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    db.query(qur, [(Number(id) + 1), album, artist, duration, rel, title, image, song_url])
       .then((result) => {
          console.log('Song is posted on Postgres: ', result)
          res.send(result).status(201); 
        })
        .catch((error) => {
          console.log('POST is failed: ', error);
          res.send(error).status(500) 
        });
  });
}

exports.update = (req, res) => {
    const { id } = req.params;
    const { album, artist, duration, released, title, image, song_url } = req.body;
    let rel = released.slice(0,10);
    let qur = 'UPDATE songs SET album = $1, artist = $2, duration = $3, released = $4, title = $5, image = $6, song_url = $7 WHERE id = $8';
    db.query(qur, [album, artist, duration, rel, title, image, song_url, id])
    .then((result) => {
        console.log('Song is updated on Postgres: ', result)
        res.send(result).status(200); 
      })
    .catch((error) => {
        console.log('Update is failed: ', error);
        res.send(error).status(500) 
    });
  };

exports.delete = (req, res) => {
    const { id } = req.params;
    // console.log(typeof id);
    let qur = 'DELETE FROM songs WHERE id = $1';
    db.query(qur, Number(id))
    .then((result) => {
        console.log('Song is deleted from Postgres: ', result)
        res.send(result).status(204); 
        })
    .catch((error) => {
        console.log('Deletion is failed: ', error);
        res.send(error).status(500) 
    });
};