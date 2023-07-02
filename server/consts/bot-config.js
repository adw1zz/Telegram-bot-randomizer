const TelegramAPI = require('node-telegram-bot-api');
const bot = new TelegramAPI(process.env.BOT_TOKEN, { polling: true });

bot.setMyCommands([
    {command: '/start', description: 'Start the bot'},
    {command: '/menu', description: 'Menubar'},
])

module.exports = bot;