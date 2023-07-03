const {Schema, model} = require('mongoose');

const RaffleScheme = new Schema({
    token: {type: String, unique: true, required: true},
    creator: {type: Number, required: true},
    participants: [{type: Number}],
    info: {type: String, required: true},
    creationDate: {type: Date, default: Date.now},
    timer: {type: Number},
    winner: {type: Number}
})

module.exports = model('Raffle', RaffleScheme);