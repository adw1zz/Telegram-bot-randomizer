module.exports = {
    menuOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Create raffle 🏆', callback_data: '/create_raffle' }]
            ]
        })
    },

    commandOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Return to menu', callback_data: '/menu' }]
            ]
        })
    }
}