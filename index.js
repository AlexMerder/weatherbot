const bot = require('./src/bot/index.js');
const {getWeather, getSum} = require('./src/bot/commands.js');

let userMap = {};

bot.on('message', async msg => {

    const chatId = msg.chat.id;
    const text = msg.text;
    
    console.log('message', msg);

    if(text === "/weather") {
        userMap[chatId] = 1;
        await bot.sendMessage(chatId, 'Enter a city or country');
    } else if(text === "/sum") {
        await bot.sendMessage(chatId, 'Enter an expression: Example(2+2)')
        userMap[chatId] = 2;
    } else {
        if(userMap[chatId] === 1) {
            const weatherInfo = await getWeather(text);
            console.log('weather info: ', weatherInfo);
            await bot.sendMessage(chatId, weatherInfo);
        } else if(userMap[chatId] === 2) {
            const sum = getSum(text);
            await bot.sendMessage(chatId, sum);
        } else {
            await bot.sendMessage(chatId, "Select a command");
        }
    }
});