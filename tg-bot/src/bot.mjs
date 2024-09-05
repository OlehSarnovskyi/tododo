import TeleBot from "telebot"

const bot = new TeleBot(process.env.BOT_ACCESS_TOKEN)

export default bot