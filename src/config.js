require('dotenv').config();

const config = {
    bot_token: process.env.TOKEN,
    api_key: process.env.API_KEY,
};
module.exports = config;