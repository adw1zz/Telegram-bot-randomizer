const COMMANDS_MAP = require('../consts/commands');
const CALLBACKS_MAP = require('../consts/callbacks');

module.exports = function (bot) {
    bot.on('message', async msg => {
        const fnc = COMMANDS_MAP.get(msg.text);
        if (fnc) {
            return await fnc(bot, msg);
        }
    })
    bot.on('callback_query', async msg => {
        const fnc = CALLBACKS_MAP.get(msg.data);
        if (fnc) {
            return await fnc(bot, msg);
        }

    })
}