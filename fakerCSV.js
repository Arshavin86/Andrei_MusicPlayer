var faker = require('faker');
const fs = require('fs');
const file = fs.createWriteStream('./data.csv');

const randomSongs = [
  'https://s3-us-west-1.amazonaws.com/democrituscloud/Despacito.mp3',
  'https://s3-us-west-1.amazonaws.com/democrituscloud/Pokemon_Theme_Song.mp3',
  'https://s3-us-west-1.amazonaws.com/democrituscloud/RASPUTIN_-_Funk_Overload.mp3',
  'https://s3-us-west-1.amazonaws.com/democrituscloud/bensound-dubstep.mp3',
  'https://s3-us-west-1.amazonaws.com/democrituscloud/bensound-jazzyfrenchy.mp3',
];


file.write(`id, album, artist, duration, released, title, image, song_url \n`);
for (let i = 1; i <= 1000000; i++) {
  file.write(
    `${i}, ${faker.lorem.word()}, ${faker.name.findName()}, ${faker.random.number({ min: 100, max: 300 })}, ${faker.date.past()}, ${faker.lorem.word()}, ${faker.image.abstract()}, ${randomSongs[Math.floor(Math.random() * 5)]} \n`
  );
        if(!(i % 100)) {
                console.log(i)
        }
}
file.end();
console.log('DONE');
