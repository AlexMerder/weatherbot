const TelegramBot = require('node-telegram-bot-api');


const { bot_token } = require('../config.js');

const bot = new TelegramBot(bot_token, { polling: true });


bot.setMyCommands([
    {command: '/weather', description: 'Get weather info'},
    {command: '/sum', description: 'Sum two number? Ok'},
]).then(() => {
    console.log('Commands set successfully')
})
    .catch(error => {
        console.log('Error setting commands: ' + error);
    });
module.exports = bot;