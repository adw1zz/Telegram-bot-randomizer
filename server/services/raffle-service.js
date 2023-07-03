const raffleModel = require('../models/raffle-model');
const RaffleDto = require('../dtos/raffle-dto');

class RaffleService {

    async createRaffle(token, info, timer, creator) {
        const isRaffleExists = await raffleModel.findOne({ token: token });
        if (isRaffleExists) {
            return false;
        }
        const raffle = await raffleModel.create({ token, creator, info, timer });
        return new RaffleDto(raffle);
    }

    async getRaffles(creator) {
        const raffles = await raffleModel.find({ creator });
        const raffleDtos = raffles.map((raffle) => {
            return new RaffleDto(raffle);
        })
        return raffleDtos;
    }

    async removeRaffle(token) {
        const raffle = await raffleModel.findOneAndRemove({ token });
        if (raffle) {
            return true
        } else {
            return false
        }
    }

    async editRaffle(token, newData) {
        await raffleModel.findOneAndUpdate({ token }, { ...newData })
    }

}

module.exports = new RaffleService(); 