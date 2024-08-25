const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

const token = process.env.BOT_ACCESS_TOKEN
const bot = new TelegramBot(token, { polling: true })

bot.on('message', msg => {
    const chatId = msg.chat.id
    const text = msg.text

    if (text === '/launch') {
        bot.sendMessage(chatId, 'Hello, world!')
    }
});