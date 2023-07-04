module.exports = function (defaultArray) {
    const newArray = defaultArray.map((raffle) => {
        return [{ text: `${raffle.token} 🎯`, callback_data: `${raffle.id}` }]
    })
    return {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                ...newArray,
                [{ text: 'Return to menu ❌', callback_data: '/menu' }]
            ]
        })
    }
}