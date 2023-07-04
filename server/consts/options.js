module.exports = {
    menuOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Create raffle ⚡', callback_data: '/create_raffle' }, { text: 'My raffles 📑', callback_data: '/get_raffles' }],
                [{ text: 'Participate 🚀', callback_data: '/add_participant' }],
                [{ text: 'Randomizer 🎲', callback_data: '/randomize' }]
            ]
        })
    },

    commandOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Return to menu ❌', callback_data: '/menu' }]
            ]
        })
    }

}