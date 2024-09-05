import TeleBot from "telebot"

const bot = new TeleBot(process.env.BOT_ACCESS_TOKEN)

bot.on('text', msg => {
    return !msg.text.startsWith('/') ? msg.reply.text(msg.text + ' hahaha') : null
})


export default bot