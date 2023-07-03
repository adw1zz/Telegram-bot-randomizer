const { menuOptions, commandOptions } = require('../consts/options');
const inputService = require('../services/input-service');
const raffleService = require('../services/raffle-service');
const MESSAGES = require('../consts/messages');

class CallbackController {
    async menu(bot, msg) {
        try {
            return await bot.sendMessage(msg.message.chat.id, MESSAGES.MENUBAR, menuOptions);
        } catch (e) {
            await bot.sendMessage(msg.chat.id, MESSAGES.BACK_END_ERROR, commandOptions);
            throw e;
        }
    }

    async createRaffle(bot, msg) {
        try {
            await bot.sendMessage(msg.message.chat.id, MESSAGES.CREATE_RAFFLE, commandOptions);
            const handler = async (msg) => {
                if (msg.text[0] != '/') {
                    const inputData = inputService.parseInputData(msg.text);
                    if (!inputData) {
                        await bot.sendMessage(msg.chat.id, MESSAGES.SYNTAX_ERROR, commandOptions);
                    } else {
                        const raffleData = await raffleService.createRaffle(inputData.token, inputData.info, inputData.timer, msg.chat.id);
                        if (!raffleData) {
                            await bot.sendMessage(msg.chat.id, MESSAGES.RAFFLE_EXISTS, commandOptions);
                        } else {
                            await bot.sendMessage(msg.chat.id, `${MESSAGES.SUCCESS}Raffle created!\nUsers can participate by hashtag ${raffleData.token}`, commandOptions);
                        }
                    }
                }
                return bot.removeListener('message', handler);
            }
            return bot.on('message', handler);
        } catch (e) {
            await bot.sendMessage(msg.chat.id, MESSAGES.BACK_END_ERROR, commandOptions);
            throw e;
        }
    }

}

module.exports = new CallbackController();