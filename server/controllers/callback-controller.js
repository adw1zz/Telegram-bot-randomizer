const { menuOptions, commandOptions } = require('../consts/options');
const inputService = require('../services/input-service');
const raffleService = require('../services/raffle-service');
const MESSAGES = require('../consts/messages');
const rafflesListOptionsConstructor = require('../utils/raffles-list-options');
const msToTime = require('../utils/time-formater');
const randomizeService = require('../services/randomize-service');

class CallbackController {
    async menu(bot, msg) {
        try {
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            return await bot.sendMessage(msg.message.chat.id, MESSAGES.MENUBAR, menuOptions);
        } catch (e) {
            await bot.sendMessage(msg.chat.id, MESSAGES.BACK_END_ERROR, commandOptions);
            throw e;
        }
    }

    async createRaffle(bot, msg) {
        try {
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
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

    async getRaffles(bot, msg) {
        try {
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            const raffles = await raffleService.getRaffles(msg.message.chat.id);
            const optionsList = rafflesListOptionsConstructor(raffles);
            await bot.sendMessage(msg.message.chat.id, MESSAGES.RAFFLES_LIST, optionsList);
            const handler = async (msg) => {
                if (msg.data[0] != '/') {
                    const currentRaffle = raffles.find(raffle => raffle.id === msg.data);
                    const currentRaffleTimerInMilliseconds = currentRaffle.timer * 3600000;
                    const created = new Date(currentRaffle.creationDate);
                    const msLeft = ((created.getTime() + currentRaffleTimerInMilliseconds) - Date.now());
                    await bot.sendMessage(msg.message.chat.id, `${MESSAGES.RAFFLE_DATA}Raffle hastag: ${currentRaffle.token}\nInfo: ${currentRaffle.info}\n${msToTime(msLeft)} time left\n-----------\nWinner: ${currentRaffle.winner}`, commandOptions);
                }
                return bot.removeListener('callback_query', handler);
            }
            return bot.on('callback_query', handler)
        } catch (e) {
            await bot.sendMessage(msg.chat.id, MESSAGES.BACK_END_ERROR, commandOptions);
            throw e;
        }
    }

    async addParticipant(bot, msg) {
        try {
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            await bot.sendMessage(msg.message.chat.id, MESSAGES.ADD_PARTICIPANT, commandOptions);
            const handler = async (msg) => {
                if (msg.text[0] != '/') {
                    const isAdd = await raffleService.addParticipant(msg.chat.id, msg.text);
                    if (isAdd) {
                        const created = new Date(isAdd.creationDate);
                        const msTimer = isAdd.timer * 3600000;
                        const msLeft = ((created.getTime() + msTimer) - Date.now());
                        await bot.sendMessage(msg.chat.id, `${MESSAGES.SUCCESS}You have been successfully added, expect the bot to inform you about the results. Good luck!\nAbout raffle:\nhashtag: ${isAdd.token}\ninfo: ${isAdd.info}\n${msToTime(msLeft)} time left`, commandOptions);
                    } else {
                        await bot.sendMessage(msg.chat.id, MESSAGES.FIND_ERROR, commandOptions);
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

    async randomize(bot, msg) {
        try {
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            await bot.sendMessage(msg.message.chat.id, MESSAGES.RANDOMIZE, commandOptions);
            const handler = async (msg) => {
                if (msg.document) {
                    const stream = bot.getFileStream(msg.document.file_id);
                    const winner = randomizeService.randomizeFromTXTFile(stream);
                    if (!winner) {
                        await bot.sendMessage(msg.chat.id, MESSAGES.SYNTAX_ERROR, commandOptions);
                    } else {
                        await bot.sendMessage(msg.chat.id, `${MESSAGES.RANDOMIZE_RESULT}Value: ${winner}`, commandOptions);
                    }
                } else if (msg.text[0] != '/') {
                    const winner = randomizeService.randomize(msg.text);
                    if (!winner) {
                        await bot.sendMessage(msg.chat.id, MESSAGES.SYNTAX_ERROR, commandOptions);
                    } else {
                        await bot.sendMessage(msg.chat.id, `${MESSAGES.RANDOMIZE_RESULT}Value: ${winner}`, commandOptions);
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