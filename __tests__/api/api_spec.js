const frisby = require('frisby');
const Joi = frisby.Joi; // Frisby exposes Joi for convenience


//sample test:
// it('should be a teapot', function () {
//   return frisby.get('http://httpbin.org/status/418')
//     .expect('status', 418);
// });

//GET an item from db:
var itemID = 10000000;
it('Should return item with given ID and status 200', () => {
    return frisby.get(`http://127.0.0.1:8000/api/jane/player/${itemID}`)
        .expect('status', 200)
        .then((result) => {
            // console.log(result.json.rows[0].id);
            expect(result.json.rows[0].id).toBe(itemID);
        })   
})

//POST an item into db:
// it('Should return status 201', () => {
//     return frisby.post('http://127.0.0.1:8000/api/jane/player', {
//         id: 10000005,
//         album: "Generator", 
//         artist: "Bad Religion", 
//         duration: 100,
//         released: 1992-10-24,
//         title: 'Punk',
//         image: 'http://lorempixel.com/640/480/abstract',
//         song_url: 'https://s3-us-west-1.amazonaws.com/democrituscloud/RASPUTIN_-_Funk_Overload.mp3'
//     })
//     .expect('status', 200);
// })