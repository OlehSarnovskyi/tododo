import TeleBot from "telebot"

const bot = new TeleBot(process.env.BOT_ACCESS_TOKEN)

bot.on('text', msg => msg.reply.text(msg.text + 'hahaha'))

export default bot