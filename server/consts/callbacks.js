const callbackController = require('../controllers/callback-controller');

module.exports = CALLBACKS_MAP = new Map([
    ['/menu', callbackController.menu],
    ['/create_raffle', callbackController.createRaffle],
    ['/get_raffles', callbackController.getRaffles],
    ['/add_participant', callbackController.addParticipant],
    ['/randomize', callbackController.randomize],
])