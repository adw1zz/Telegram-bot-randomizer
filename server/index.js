require('dotenv').config();
const bot = require('./consts/bot-config');
const router = require('./router/command-router');
const mongoose = require('mongoose');

const root = async () => {
    try {
        await mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        router(bot);
    } catch (e) {
        console.log(e);
    }
}

root();
