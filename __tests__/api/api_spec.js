const frisby = require('frisby');
const faker = require('faker');
const Joi = frisby.Joi; // Frisby exposes Joi for convenience


// sample test:
// it('should be a teapot', function () {
//   return frisby.get('http://httpbin.org/status/418')
//     .expect('status', 418);
// });

//GET an item from db:
var itemID = 100003;
it('Should return item with given ID and a status of 200', () => {
    return frisby.get(`http://127.0.0.1:8000/api/jane/player/${itemID}`)
        .expect('status', 200)
        .then((result) => {
            // console.log(result.json.rows[0].id);
            //for Cassandra:
            // expect(result.json.rows[0].id).toBe(itemID);

            //for Postgres:
            expect(result.json[0].id).toBe(itemID);
        })   
})

// POST an item into db:
it('POST should return a status of 201 created', () => {
    return frisby.post('http://127.0.0.1:8000/api/jane/player/', {
        album: "Generator", 
        artist: "BadReligion", 
        duration: 100,
        released: faker.date.past(),
        title: 'Punk',
        image: 'http://lorempixel.com/640/480/abstract',
        song_url: 'https://s3-us-west-1.amazonaws.com/democrituscloud/RASPUTIN_-_Funk_Overload.mp3'
    })
    .expect('status', 201)
    .then((result) => {
        console.log('result of POST: ',result);
  });
})

// // Update an item on Db:
it ('Update should return a status of 200 OK', function () {
    return frisby
    .put(`http://127.0.0.1:8000/api/jane/player/${itemID}`, {
        album: "My Generation", 
        artist: "GoodReligion", 
        duration: 101,
        released: faker.date.past(),
        title: 'PunkRock',
        image: 'http://lorempixel.com/640/480/abstract',
        song_url: 'https://s3-us-west-1.amazonaws.com/democrituscloud/RASPUTIN_-_Funk_Overload.mp3'
    })
    .expect('status', 200)
    .then((result) => {
        console.log('result from server: ', result.json);
    });
});

//Delete an item on db: 
it ('DELETE should return a status of 204 No Content', function () {
    return frisby
      .del(`http://127.0.0.1:8000/api/jane/player/${itemID}`)
      .expect('status', 204);
  });
