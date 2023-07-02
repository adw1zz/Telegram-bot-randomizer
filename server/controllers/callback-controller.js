const { menuOptions, commandOptions } = require('../consts/options');
const inputService = require('../services/input-service');
const MESSAGES = require('../consts/messages');

class CallbackController {
    async menu(bot, msg) {
        try {
            bot.removeListener('message', bot.listeners('message')[1]);
            return await bot.sendMessage(msg.message.chat.id, MESSAGES.MENUBAR, menuOptions);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async createRaffle(bot, msg) {
        try {
            await bot.sendMessage(msg.message.chat.id, MESSAGES.CREATE_RAFFLE, commandOptions);
            const handler = async (msg) => {
                const inputData = inputService.parseInputData(msg.text);
                if (!inputData) {
                    await bot.sendMessage(msg.chat.id, MESSAGES.SYNTAX_ERROR, commandOptions);
                } else {
                    console.log(inputData);
                    await bot.sendMessage(msg.chat.id, `${MESSAGES.SUCCESS}Raffle created!`, commandOptions);
                }
                return bot.removeListener('message', handler);
            }
            return bot.on('message', handler);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

}

module.exports = new CallbackController();