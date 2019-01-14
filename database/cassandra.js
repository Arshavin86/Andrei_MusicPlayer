const cassandra = require('cassandra-driver');
// const async = require('async');

const clientOptions = {
    localDataCenter: 'datacenter1',
    contactPoints: ['127.0.0.1'], 
    keyspace: 'soundcloud'
}; 
//Connect to the cluster
const client = new cassandra.Client(clientOptions);


client.connect((err) => {
    if(err) {
       console.log('Error connecting cassandra is - ', err);
    } else {
       console.log('Successfully connected to cassandra.');
    }
}); 

module.exports = client;