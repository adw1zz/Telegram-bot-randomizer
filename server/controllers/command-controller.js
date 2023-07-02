const { menuOptions } = require('../consts/options');
const MESSAGES = require('../consts/messages');

class CommandController {

    async start(bot, msg) {
        try {
            return await bot.sendMessage(msg.chat.id, MESSAGES.START);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async menu(bot, msg) {
        try {
            return await bot.sendMessage(msg.chat.id, MESSAGES.MENUBAR, menuOptions);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

}

module.exports = new CommandController();