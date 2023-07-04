const raffleModel = require('../models/raffle-model');
const { commandOptions } = require('../consts/options');

module.exports = async function (bot) {
    const raffles = await raffleModel.find();
    const closedRafflesArray = raffles.map(async (raffle) => {
        const created = new Date(raffle.creationDate);
        const createdMs = created.getTime();
        const msTimer = raffle.timer * 3600000;
        if ((msTimer + createdMs) >= Date.now()) {
            const winnerIndex = Math.floor(Math.random() * raffle.participants.length);
            const winnerTgID = raffle.participants[winnerIndex];
            raffle.winner = winnerTgID;
            await raffle.save();
            return {
                winner: winnerTgID,
                raffleData: {
                    info: raffle.info,
                    token: raffle.token,
                },
                creator: raffle.creator
            };
        }
    })
    closedRafflesArray.forEach(async (closedRaffle) => {
        await bot.sendMessage(closedRaffle.winner, `Congratulations, you won the lottery:\nRaffle hashtag: ${closedRaffle.token}\nAbout raffle: ${closedRaffle.info}\n----------\nWait until you are contacted, your contact details of the telegram account have been delivered to the lottery creator.`, commandOptions);
        const chat = await bot.getChat(closedRaffle.winner);
        const tgAccountLink = `https://t.me/${chat.username}`;
        await bot.sendMessage(closedRaffle.creator, `The lottery has come to an end and we have a winner, write to him:\n ${tgAccountLink}\n---------\nRaffle:\nRaffle hashtag: ${closedRaffle.token}\nAbout raffle: ${closedRaffle.info}`, commandOptions)
    })
}