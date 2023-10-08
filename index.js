const bot = require('./src/bot/index.js');
const {getWeather, getSum} = require('./src/bot/commands.js');
const {client} = require('./src/db/clientConfig');

bot.on('message', async msg => {

    const chatId = msg.chat.id;
    const text = msg.text;

    console.log('message', msg);

    switch (text) {
        case '/weather':
            await client.query("INSERT INTO users(chat_id, state) VALUES ($1, $2) ON CONFLICT(chat_id) DO UPDATE SET state = $2", [chatId, 1]);
            await bot.sendMessage(chatId, 'Enter a city or country. Example "New York"');
            break;
        case '/sum':
            await client.query("INSERT INTO users(chat_id, state) VALUES ($1, $2) ON CONFLICT(chat_id) DO UPDATE SET state = $2", [chatId, 2]);
            await bot.sendMessage(chatId, 'Enter an expression: Example "2+3"');
            break;
        default:

            const chatUserId = await client.query("SELECT state FROM users WHERE chat_id = $1", [chatId]);
            const userState = chatUserId.rows[0] ? chatUserId.rows[0].state : null;

            switch (userState) {
                case 1:
                    const weatherInfo = getWeather(text);
                    console.log('weather info: ', await weatherInfo);
                    await bot.sendMessage(chatId, await weatherInfo);
                    client.query("DELETE FROM users WHERE chat_id = $1", [chatId]);
                    break;
                case 2:
                    const sum = getSum(text);
                    await bot.sendMessage(chatId, sum);
                    client.query("DELETE FROM users WHERE chat_id = $1 ", [chatId]);
                    break;
                default:
                    await bot.sendMessage(chatId, "Select a command");
                    break;
            }
    }
});