\connect soundcloud;
 CREATE SCHEMA IF NOT EXISTS testSong AUTHORIZATION andrei;
    CREATE TABLE songs (
        id integer NOT NULL PRIMARY KEY, 
        album text NOT NULL, 
        artist text NOT NULL, 
        duration integer NOT NULL,
        released date NOT NULL,
        title text NOT NULL,
        image text NOT NULL,
        song_url text NOT NULL
    );