const commandController = require('../controllers/command-controller');

module.exports = COMMANDS_MAP = new Map([
    ['/start', commandController.start],
    ['/menu', commandController.menu],
])

