const faker = require('faker');

// alternate between 5 songs to be played for each data, but each data will have diff. wave form
const randomSongs = [
  'https://s3-us-west-1.amazonaws.com/democrituscloud/Despacito.mp3',
  'https://s3-us-west-1.amazonaws.com/democrituscloud/Pokemon_Theme_Song.mp3',
  'https://s3-us-west-1.amazonaws.com/democrituscloud/RASPUTIN_-_Funk_Overload.mp3',
  'https://s3-us-west-1.amazonaws.com/democrituscloud/bensound-dubstep.mp3',
  'https://s3-us-west-1.amazonaws.com/democrituscloud/bensound-jazzyfrenchy.mp3',
];

  let songArray = [];

  for (let i = 1; i <= 10000000; i += 1) {
    let obj1 = {
      title: faker.lorem.word(),
      artist: faker.name.findName(),
      album: faker.lorem.word(),
      released: faker.date.past(), // JavaScript heap out of memory on this step
      duration: faker.random.number({ min: 100, max: 300 }),
      image: faker.image.abstract(),
      song_url: randomSongs[Math.floor(Math.random() * 5)],
    };
    songArray.push(obj1);
  }
console.log(songArray.length);


module.exports = { songArray };


