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
            chat_id bigint PRIMARY KEY,
            state integer
        );
    `;

    await client.query(createTableQuery);
    console.log("Table 'users' created successfully!");
}
createTable();
module.exports = {client};