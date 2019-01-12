
DROP KEYSPACE IF EXISTS soundcloud;
CREATE KEYSPACE soundcloud WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };

use soundcloud;

CREATE TABLE songs (
   
);
