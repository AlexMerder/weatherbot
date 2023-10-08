const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'userState',
    user: 'admin',
    password: 'admin'
});

client.connect()
    .then(() => console.log('Connected to PSQL'))
    .catch(err => console.error('Connection error', err.stack));

module.exports = {client};