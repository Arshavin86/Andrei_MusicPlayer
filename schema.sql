
 \connect soundcloud;
 CREATE SCHEMA IF NOT EXISTS testSong AUTHORIZATION andrei;
    CREATE TABLE songs (
        id integer,
        album text, 
        artist text, 
        duration integer,
        released date,
        title text,
        wave text,
        image text,
        song_url text
    );