module.exports = class RaffleDto {
    id;
    token;
    creator;
    participants;
    info;
    creationDate;
    timer;
    winner;

    constructor(model) {
       this.id = model.id;
       this.token = model.token;
       this.creator = model.creator;
       this.participants = model.participants;
       this.info = model.info;
       this.creationDate = model.creationDate;
       this.timer = model.timer; 
       this.winner = model.winner;
    }
}