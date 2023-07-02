const callbackController = require('../controllers/callback-controller');

module.exports = CALLBACKS_MAP = new Map([
    ['/menu', callbackController.menu],
    ['/create_raffle', callbackController.createRaffle]
])