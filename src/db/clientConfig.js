const {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function createTable() {
    await client.connect();

    const createTableQuery = `
        CREATE TABLE users (
            chat_id bigint,
            state integer
        );
    `;

    await client.query(createTableQuery);
    console.log("Table 'users' created successfully!");

    await client.end();
}

createTable();

client.connect()
    .then(() => console.log('Connected to PSQL'))
    .catch(err => console.error('Connection error', err.stack));

module.exports = {client};